import { Link } from 'app/components/Link'
import {
  NCBI,
  NCBI_ONTOLOGY_PATTERN,
  OBO,
  OBO_PATTERN,
  WORMBASE,
  WORMBASE_PATTERN,
} from 'app/constants/datasetInfoLinks'

export interface InfoLinkProps {
  value?: string | null
  id?: number | string | null
}

export function InfoLink({ value, id }: InfoLinkProps) {
  if (!value) {
    return <span>--</span>
  }

  if (id) {
    let link
    if (typeof id === 'number') {
      link = `${NCBI}${id}`
    } else if (id.match(NCBI_ONTOLOGY_PATTERN)) {
      link = `${NCBI}${id.replace('NCBITaxon:', '')}`
    } else if (id.match(WORMBASE_PATTERN)) {
      link = `${WORMBASE}${id.replaceAll(':', '_')}`
    } else if (id.match(OBO_PATTERN)) {
      link = `${OBO}${id.replaceAll(':', '_')}`
    }
    // don't link if no patterns match
    if (link) {
      return (
        <Link to={link} className="text-light-sds-color-primitive-blue-500">
          {value}
        </Link>
      )
    }
  }

  return <span>{value}</span>
}
