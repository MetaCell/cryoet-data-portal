/* eslint-disable @typescript-eslint/no-throw-literal */

import { ShouldRevalidateFunctionArgs } from '@remix-run/react'
import { json, LoaderFunctionArgs } from '@remix-run/server-runtime'
import { startCase, toNumber } from 'lodash-es'
import { match } from 'ts-pattern'

import { apolloClientV2 } from 'app/apollo.server'
import { AnnotationFilter } from 'app/components/AnnotationFilter/AnnotationFilter'
import { DownloadModal } from 'app/components/Download'
import { NoFilteredResults } from 'app/components/NoFilteredResults'
import { NoTotalResults } from 'app/components/NoTotalResults'
import { RunHeader } from 'app/components/Run'
import { AnnotationDrawer } from 'app/components/Run/AnnotationDrawer'
import { RunAnnotationTable } from 'app/components/Run/RunAnnotationTable'
import { RunMetadataDrawer } from 'app/components/Run/RunMetadataDrawer'
import { RunTomogramsTable } from 'app/components/Run/RunTomogramsTable'
import { TomogramMetadataDrawer } from 'app/components/Run/TomogramMetadataDrawer'
import { TablePageLayout } from 'app/components/TablePageLayout'
import { QueryParams } from 'app/constants/query'
import { getRunByIdV2 } from 'app/graphql/getRunByIdV2.server'
import { useDownloadModalQueryParamState } from 'app/hooks/useDownloadModalQueryParamState'
import { useI18n } from 'app/hooks/useI18n'
import { useRunById } from 'app/hooks/useRunById'
import { DownloadConfig } from 'app/types/download'
import { shouldRevalidatePage } from 'app/utils/revalidate'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id ? +params.id : NaN

  if (Number.isNaN(+id)) {
    throw new Response(null, {
      status: 400,
      statusText: 'ID is not defined',
    })
  }

  const url = new URL(request.url)
  const annotationsPage = +(
    url.searchParams.get(QueryParams.AnnotationsPage) ?? '1'
  )
  const depositionId = Number(url.searchParams.get(QueryParams.DepositionId))

  const { data: responseV2 } = await getRunByIdV2({
    client: apolloClientV2,
    id,
    annotationsPage,
    params: url.searchParams,
    depositionId: Number.isNaN(depositionId) ? undefined : depositionId,
  })

  if (responseV2.runs.length === 0) {
    throw new Response(null, {
      status: 404,
      statusText: `Run with ID ${id} not found`,
    })
  }

  return json({
    v2: responseV2,
  })
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  return shouldRevalidatePage({
    ...args,
    paramsToRefetch: [
      QueryParams.AuthorName,
      QueryParams.AuthorOrcid,
      QueryParams.ObjectName,
      QueryParams.ObjectId,
      QueryParams.ObjectShapeType,
      QueryParams.MethodType,
      QueryParams.AnnotationSoftware,
      QueryParams.AnnotationsPage,
      QueryParams.DepositionId,
    ],
  })
}

export default function RunByIdPage() {
  const { t } = useI18n()
  const {
    run,
    processingMethods,
    annotationShapes,
    tomograms,
    annotationFilesAggregates,
    tomogramsCount,
  } = useRunById()
  const {
    downloadConfig,
    openRunDownloadModal,
    annotationId,
    tomogramId,
    fileFormat,
    objectShapeType,
  } = useDownloadModalQueryParamState()

  const activeTomogram =
    downloadConfig === DownloadConfig.Tomogram
      ? tomograms.find((tomogram) => tomogram.id === Number(tomogramId))
      : undefined

  const activeAnnotationShape = annotationShapes.find(
    (annotationShape) =>
      annotationShape.annotation?.id === toNumber(annotationId) &&
      annotationShape.shapeType === objectShapeType,
  )

  const activeFile = activeAnnotationShape?.annotationFiles.edges.find(
    (file) => file.node.format === fileFormat,
  )

  const httpsPath = activeFile
    ? activeFile.node.httpsPath
    : activeTomogram?.httpsMrcFile ?? undefined

  const getFileSize = () => {
    if (activeFile) {
      return activeFile.node.fileSize ?? undefined
    }
    if (fileFormat === 'mrc') {
      return activeTomogram?.fileSizeMrc ?? undefined
    }
    if (fileFormat === 'zarr') {
      return activeTomogram?.fileSizeOmezarr ?? undefined
    }
    return annotationFilesAggregates.totalSize
  }

  const fileSize = getFileSize()

  return (
    <TablePageLayout
      header={<RunHeader />}
      tabsTitle={t('browseRunData')}
      tabs={[
        {
          title: t('annotations'),
          filterPanel: <AnnotationFilter />,
          table: <RunAnnotationTable />,
          pageQueryParamKey: QueryParams.AnnotationsPage,
          filteredCount: annotationFilesAggregates.filteredCount,
          totalCount: annotationFilesAggregates.totalCount,
          countLabel: t('annotations'),
          noTotalResults: (
            <NoTotalResults
              title={t('noAnnotationsAvailable')}
              description={t('downloadTheRunDataToCreateYourOwnAnnotations')}
              buttons={[
                {
                  text: t('downloadRunData'),
                  onClick: () => {
                    openRunDownloadModal({
                      runId: run.id,
                      datasetId: run.dataset?.id,
                    })
                  },
                },
                {
                  text: t('contributeYourAnnotations'),
                  onClick: () => {
                    window
                      .open(
                        'https://airtable.com/apppmytRJXoXYTO9w/shr5UxgeQcUTSGyiY?prefill_Event=RunEmptyState&hide_Event=true',
                      )
                      ?.focus()
                  },
                },
              ]}
            />
          ),
          noFilteredResults: <NoFilteredResults />,
        },
        {
          title: t('tomograms'),
          table: <RunTomogramsTable />,
          pageQueryParamKey: QueryParams.TomogramsPage,
          filteredCount: tomogramsCount,
          totalCount: tomogramsCount,
          countLabel: t('tomograms'),
          noTotalResults: (
            <NoTotalResults
              title={startCase(t('noTomogramsAvailable'))}
              description={t(
                'downloadAllRunDataViaApiToCreateYourOwnReconstructions',
              )}
              buttons={[
                {
                  text: t('downloadThisRun'),
                  onClick: () => {
                    openRunDownloadModal({
                      runId: run.id,
                      datasetId: run.dataset?.id,
                    })
                  },
                },
              ]}
            />
          ),
        },
      ]}
      downloadModal={
        <DownloadModal
          annotationShapeToDownload={activeAnnotationShape}
          tomogramToDownload={activeTomogram}
          allAnnotationShapes={annotationShapes}
          allTomograms={tomograms}
          allTomogramProcessing={processingMethods}
          datasetId={run.dataset?.id}
          datasetTitle={run.dataset?.title}
          fileSize={fileSize}
          httpsPath={httpsPath}
          objectName={activeAnnotationShape?.annotation?.objectName}
          runId={run.id}
          runName={run.name}
          s3Path={match({
            annotationId,
            downloadConfig,
            fileFormat,
          })
            .with(
              { downloadConfig: DownloadConfig.Tomogram, fileFormat: 'mrc' },
              () => activeTomogram?.s3MrcFile ?? undefined,
            )
            .with(
              { downloadConfig: DownloadConfig.Tomogram, fileFormat: 'zarr' },
              () => activeTomogram?.s3OmezarrDir ?? undefined,
            )
            .with({ downloadConfig: DownloadConfig.AllAnnotations }, () =>
              // TODO(1578): Support command that downloads multiple voxel spacing folders.
              run.tomogramVoxelSpacings.edges[0]?.node.s3Prefix
                ? `${run.tomogramVoxelSpacings.edges[0].node.s3Prefix}Annotations`
                : undefined,
            )
            .with(
              { annotationId },
              () =>
                activeAnnotationShape?.annotationFiles.edges.find(
                  (file) => file.node.format === fileFormat,
                )?.node.s3Path,
            )
            .otherwise(() => undefined)}
          tomogramId={activeTomogram?.id ?? undefined}
          type={annotationId ? 'annotation' : 'runs'}
        />
      }
      drawers={
        <>
          <RunMetadataDrawer />
          <AnnotationDrawer />
          <TomogramMetadataDrawer />
        </>
      }
    />
  )
}
