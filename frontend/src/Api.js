const apiRoot = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API_ROOT : 'http://localhost:3030/'
const pipelineApiRoot = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_DATA_API_ROOT : 'http://localhost:5000/'

// Proposals

let endpoints = {
    proposals: apiRoot + 'proposals',
    oneProposal: id => apiRoot + `proposals/${ id }`,
    proposalsByTic: apiRoot + 'proposals/by-tic',
    proposalsByDate: apiRoot + 'proposals/by-date',
    proposalsByStatus: apiRoot + 'proposals/by-status',
    proposalsByOrganization: apiRoot + 'proposals/by-organization',
    proposalsByTherapeuticArea: apiRoot + 'proposals/by-therapeutic-area',
    overall: apiRoot + 'proposals/submitted-for-services/count',
    // network: apiRoot + 'proposals/network',
}

// Resubmissions

endpoints = {
    ...endpoints,
    resubmissions: apiRoot + 'proposals/resubmissions',
    resubmissionsCount: apiRoot + 'proposals/resubmissions/count',
    resubmissionsCountByInstitution: apiRoot + 'proposals/resubmissions/count/by-institution',
    resubmissionsCountByTic: apiRoot + 'proposals/resubmissions/count/by-tic',
    resubmissionsCountByTherapeuticArea: apiRoot + 'proposals/resubmissions/count/by-therapeutic-area',
}

// 

endpoints = {
    ...endpoints,
    statuses: apiRoot + 'statuses',
    organizations: apiRoot + 'organizations',
    tics: apiRoot + 'tics',
    therapeuticAreas: apiRoot + 'therapeutic-areas',
    resources: apiRoot + 'resources',
    sites: apiRoot + 'sites',
    ctsas: apiRoot + 'ctsas',
    studyMetrics: apiRoot + 'study-metrics',
    siteMetrics: studyName => apiRoot + `site-metrics/retrieve/${ studyName }`,
    siteMetricsTemplateDownload: apiRoot + `site-metrics/template`,
    saveSiteReport: apiRoot + 'sites/reports',
}

// Studies, Sites, & CTSAs

endpoints = {
    ...endpoints,
    studyProfile: proposalID => apiRoot + `studies/${ proposalID }`, // GET - send json file containing study profile
    studySites: proposalID => apiRoot + `studies/${ proposalID }/sites`, // GET - send json file containing study sites
    studyEnrollmentData: proposalID => apiRoot + `studies/${ proposalID }/enrollment-data`, // GET - send json file containing study enrollment data
    studyUploadProfile: proposalID => apiRoot + `studies/${ proposalID }`, // POST - to send json file containing study profile
    studyUploadSites: proposalID => apiRoot + `studies/${ proposalID }/sites`, // POST - to send json file containing study sites
    studyUploadEnrollmentData: proposalID => apiRoot + `studies/${ proposalID }/enrollment-data`, // POST - to send json file containing study enrollment data
    // sitesUpload: apiRoot + `sites`, // POST to send json file containing site metrics for a study (indicated in file)
    ctsasUpload: apiRoot + `ctsas`, // POST to send json file containing CTSAs
}

// Pipeline

endpoints = {
    ...endpoints,
    dataGetBackups: pipelineApiRoot + 'backup', // GET to return list of available backups
    dataPostBackup: pipelineApiRoot + 'backup', // POST to back up database
    dataRestore: timestamp => `${ pipelineApiRoot }restore/${ timestamp }`, // /data/restore/<timestamp> to restore to backup given in
    dataSync: pipelineApiRoot + 'sync', // POST to sync with redcap
    uploadSites: pipelineApiRoot + `table/Sites`,
    uploadCtsas: pipelineApiRoot + `table/CTSAs`,
    uploadStudyProfile: pipelineApiRoot + `table/StudyProfile`,
    uploadStudySites: pipelineApiRoot + `table/StudySites`,
    uploadStudyEnrollmentData: pipelineApiRoot + `table/EnrollmentInformation`,
}

export default endpoints