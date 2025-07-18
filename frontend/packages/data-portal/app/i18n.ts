/**
 * Temporary solution for organizing strings in the codebase until a blocking
 * issue in `remix-i18next` is resolved:
 * https://github.com/sergiodxa/remix-i18next/issues/143
 *
 * TODO Remove when rest of application is refactored to use i18next.
 *
 * @deprecated Use i18next and translations in `public/locales/<lang>/translation.json` instead.
 */
export const i18n = {
  about: 'About',
  aboutAndHelp: 'About & Help',
  accelerationVoltage: 'Acceleration Voltage',
  additionalMicroscopeOpticalSetup: 'Additional microscope optical setup',
  affiliationName: 'Affiliation Name',
  affiliationNames: 'Affiliation Names',
  affineTransformationMatrix: 'Affine Transformation Matrix',
  alignedTiltSeriesBinning: 'Aligned Tilt Series Binning',
  annotatedObjects: 'Annotated Objects',
  annotation: 'Annotation',
  annotationConfidence: 'Annotation Confidence',
  annotationDetails: 'Annotation Details',
  annotationMetadata: 'Annotation Metadata',
  annotationMethod: 'Annotation Method',
  annotationObject: 'Annotation Object',
  annotationOverview: 'Annotation Overview',
  annotations: 'Annotations',
  annotationSoftware: 'Annotation Software',
  api: 'API',
  apply: 'Apply',
  askOnGitHub: 'Ask a Question on GitHub',
  author: 'Author',
  authorName: 'Author Name',
  authorOrcid: 'Author ORCID ID',
  authors: 'Authors',
  authorsMaybePlural: 'Author(s)',
  dataTypes: 'Data Types',
  availableProcessing: 'Available Processing',
  backToResults: 'Back to Results',
  beta: 'Beta',
  bingingFromFrames: 'Binning from Frames',
  browseData: 'Browse Data',
  cameraManufacturer: 'Camera Manufacturer',
  cameraModel: 'Camera Model',
  cancel: 'Cancel',
  cellLineOrStrainName: 'Cell Line or Strain Name',
  cellName: 'Cell Name',
  cellularComponent: 'Cellular Component',
  citations: 'Citations',
  confidence: 'confidence',
  contributeData: 'Contribute Data',
  contributeCta:
    'We encourage you to share datasets and/or annotations to existing data. Click below to fill out the inquiry form.',
  contributeYourData: 'Contribute your Data',
  cookiePolicy: 'Cookie Policy',
  ctf: 'CTF',
  ctfCorrected: 'Ctf Corrected',
  curatorRecommended: 'Curator Recommended',
  dataAcquisitionSoftware: 'Data Acquisition Software',
  dataset: 'Dataset',
  datasetContents: 'Dataset Contents',
  datasetCount: (count: number, max: number) => `${count} of ${max} datasets`,
  datasetDetails: 'Dataset Details',
  datasetIds: 'Dataset IDs',
  datasetMetadata: 'Dataset Metadata',
  datasets: 'Datasets',
  datasetsTab: (count: number) => `Datasets ${count}`,
  datasetTitle: 'Dataset Title',
  dataSubmissionPolicy: 'Data Submission Policy',
  depositionContents: 'Deposition Contents',
  depositionDate: 'Deposition Date',
  description: 'Description',
  documentation: 'Documentation',
  downloadDataset: 'Download Dataset',
  emdb: 'EMDB',
  empiarID: 'EMPIAR ID',
  energyFilter: 'Energy Filter',
  excellent: 'Excellent',
  false: 'False',
  faq: 'FAQ',
  feedback: 'Feedback',
  fiducialAlignmentStatus: 'Fiducial Alignment Status',
  filterBy: 'Filter by',
  filterByAnyOfTheFollowing: 'Filter by any of the following',
  filterCount: (count: number, max: number, type: string) =>
    `${count} of ${max} ${type}`,
  filterRange: 'Filter Range',
  filterTooRestrictive: 'The applied filters may be too restrictive.',
  frames: 'Frames',
  fundingAgency: 'Funding Agency',
  github: 'GitHub',
  good: 'Good',
  goToDocs: 'Go to Documentation',
  grantID: 'Grant ID',
  gridPreparation: 'Grid Preparation',
  groundTruth: 'Ground Truth',
  groundTruthAnnotation: 'Ground Truth Annotations',
  groundTruthStatus: 'Ground Truth Status',
  groundTruthUsed: 'Ground Truth Used',
  hardware: 'Hardware',
  helpAndReport: 'Help & Report',
  howToCite: 'How to cite',
  imageCorrector: 'Image Corrector',
  keyPhoto: 'key photo',
  landingHeaderTitle: 'Open access to annotated cryoET tomograms',
  lastModified: (date: string) => `Last Modified: ${date}`,
  lastModifiedBlank: 'Last Modified',
  license: 'License',
  limitOneValuePerField: 'Limit one value per field',
  meetsAll: 'Meets all',
  metadata: 'Metadata',
  microscopeManufacturer: 'Microscope Manufacturer',
  microscopeModel: 'Microscope model',
  moderate: 'Moderate',
  moreInfo: 'More Info',
  na: 'NA',
  nameOrId: 'Name/ID',
  napariPlugin: 'napari Plugin',
  nFiles: (count: number) => `${count} File${count !== 1 ? 's' : ''}`,
  nMoreObjects: (count: number) => `${count} More Objects`,
  no: 'No',
  notApplicable: 'Not Applicable',
  notSubmitted: 'Not Submitted',
  numberOfRuns: 'Number of Runs',
  objectCount: 'Object Count',
  objectDescription: 'Object Description',
  objectId: 'Object ID',
  objectName: 'Object Name',
  objectShapeType: 'Object Shape Type',
  objectState: 'Object State',
  orExploreViaApi: 'or explore via API',
  organism: 'Organism',
  organismName: 'Organism Name',
  otherSetup: 'Other Setup',
  phasePlate: 'Phase Plate',
  pixelSpacing: 'Pixel Spacing',
  plusMore: (count: number) => `+${count} More`,
  poor: 'Poor',
  precision: 'Precision',
  privacy: 'Privacy',
  privacyPolicy: 'Privacy Policy',
  processingSoftware: 'Processing Software',
  publications: 'Publications',
  rawFrames: 'Raw Frames',
  recall: 'Recall',
  reconstructionMethod: 'Reconstruction Method',
  reconstructionSoftware: 'Reconstruction Software',
  relatedDatabases: 'Related Databases',
  relatedEmpiarEntry: 'Related EMPIAR Entry',
  releaseDate: (date: string) => `Release Date: ${date}`,
  releaseDateBlank: 'Release Date',
  reportIssueOnGithub: 'Report Issue on GitHub',
  resolutionsAvailable: 'Samplings Available',
  run: 'Run',
  runContents: 'Run Contents',
  runCount: (count: number, max: number) => `${count} of ${max} Runs`,
  runDetails: 'Run Details',
  runs: 'Runs',
  runsTab: (count: number) => `Runs ${count}`,
  sampleAndExperimentConditions: 'Sample and Experiment Conditions',
  samplePreparation: 'Sample Preparation',
  sampleType: 'Sample Type',
  search: 'Search',
  seriesIsAligned: 'Series is Aligned',
  showLess: 'Show Less',
  size: 'Size',
  smallestAvailableVoxelSpacing: 'Smallest Available Voxel Spacing',
  species: 'Species',
  sphericalAberrationConstant: 'Spherical Aberration Constant',
  submitFeedback: 'Submit Feedback',
  tellUsMore: 'Tell us More',
  terms: 'Terms',
  termsOfUse: 'Terms of Use',
  tiltAxis: 'Tilt Axis',
  tiltingScheme: 'Tilting Scheme',
  tiltQuality: 'Tilt Quality',
  tiltRange: 'Tilt Range',
  tiltRangeFilterDescription:
    'Angle is in degrees (°). Tilt range is the difference between the max tilt angle and the min tilt angle.',
  tiltRangeFilterTitle: 'Add min/max angle to define filter range:',
  tiltScheme: 'Tilt Scheme',
  tiltSeries: 'Tilt Series',
  tiltSeriesAlignment: 'Tilt Series Alignment',
  tiltSeriesMetadata: 'Tilt Series Metadata',
  tiltSeriesQualityScore: 'Tilt Series Quality Score',
  tiltStep: 'Tilt Step',
  tissueName: 'Tissue Name',
  title: 'CryoET Data Portal',
  tomogram: 'Tomogram',
  tomogramMetadata: 'Tomogram Metadata',
  tomogramProcessing: 'Tomogram Processing',
  tomograms: 'Tomograms',
  tools: 'Tools',
  totalFlux: 'Total Flux',
  true: 'True',
  unitAngstrom: (x: number) => `${x}Å`,
  unitDegree: (x: number) => `${x}°`,
  unitMilimeter: (x: number) => `${x} mm`,
  unitVolts: (x: number) => `${x} V`,
  valueToValue: (x: string, y: string) => `${x} to ${y}`,
  veryPoor: 'Very Poor',
  viewAndDownloadDatasets: 'View and Download Datasets',
  viewDatasetsCta:
    'Find and visualize cryoET datasets in the portal and download to use for your own work.',
  yes: 'Yes',
}
