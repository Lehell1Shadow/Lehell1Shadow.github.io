(() => {
    var sr = {
        //warning and error string resources
        controllerNotInitialized: "Controller is not initialized.",
        noReportInstance: "No report instance.",
        missingTemplate: "!obsolete resource!",
        noReport: "No report.",
        noReportDocument: "No report document.",
        missingOrInvalidParameter: "Favor de ingresar un valor para los siguientes parámetros:\n",
        invalidParameter: "Favor de ingresar un valor.",
        invalidDateTimeValue: "Favor de ingresar una fecha.",
        parameterIsEmpty: "El valor del parámetro no puede estar vacío.",
        cannotValidateType: "Cannot validate parameter of type {type}.",
        loadingFormats: "Cargando...",
        loadingReport: "Cargando reporte...",
        preparingDownload: "Preparando documento para descargarlo. Favor de esperar...",
        preparingPrint: "Preparindo documento para imprimir. Favor de esperar...",
        errorLoadingTemplates: "Error loading the report viewer's templates. (templateUrl = '{0}').",
        errorServiceUrl: "Cannot access the Reporting REST service. (serviceUrl = '{0}'). Make sure the service address is correct and enable CORS if needed. (https://enable-cors.org)",
        errorServiceVersion: "The version of the Report Viewer '{1}' does not match the version of the Reporting REST Service '{0}'. Please make sure both are running same version.",
        loadingReportPagesInProgress: "{0} páginas cargadas hasta ahora...",
        loadedReportPagesComplete: "Listo. Total {0} páginas cargadas.",
        noPageToDisplay: "No hay páginas para mostrar.",
        errorDeletingReportInstance: "Error deleting report instance: '{0}'.",
        errorRegisteringViewer: "Error registering the viewer with the service.",
        noServiceClient: "No serviceClient has been specified for this controller.",
        errorRegisteringClientInstance: "Error registering client instance.",
        errorCreatingReportInstance: "Error creating report instance (Report = '{0}').",
        errorCreatingReportDocument: "Error creating report document (Report = '{0}'; Format = '{1}').",
        unableToGetReportParameters: "Unable to get report parameters.",
        errorObtainingAuthenticationToken: "Error obtaining authentication token.",
        clientExpired: "Click 'Refresh' to restore client session.",
        promisesChainStopError: "Error shown. Throwing promises chain stop error.",
        renderingCanceled: "Report processing was canceled.",
        tryReportPreview: "Ahora se puede obtener una vista previa del informe.",
        //viewer template string resources
        parameterEditorSelectNone: "Limpiar selección",
        parameterEditorSelectAll: "Seleccionar todo",
        parametersAreaPreviewButton: "Ejecutar",
        menuNavigateBackwardText: "Navegar atrás",
        menuNavigateBackwardTitle: "Navegar atrás",
        menuNavigateForwardText: "Navegar adelante",
        menuNavigateForwardTitle: "Navegar adelante",
        menuStopRenderingText: "Detener renderizado",
        menuStopRenderingTitle: "Detener renderizado",
        menuRefreshText: "Refrescar",
        menuRefreshTitle: "Refrescar",
        menuFirstPageText: "Primera página",
        menuFirstPageTitle: "Primera página",
        menuLastPageText: "Última página",
        menuLastPageTitle: "Última página",
        menuPreviousPageTitle: "Página anterior",
        menuNextPageTitle: "Siguiente página",
        menuPageNumberTitle: "Page Number Selector",
        menuDocumentMapTitle: "Mostrar mapa del documento",
        menuParametersAreaTitle: "Mostrar área de parámetros",
        menuZoomInTitle: "Zoom In",
        menuZoomOutTitle: "Zoom Out",
        menuPageStateTitle: "Mostrar página completa/ancho de página",
        menuPrintText: "Imprimir...",
        menuContinuousScrollText: "Toggle Continuous Scrolling",
        menuSendMailText: "Send an email",
        menuPrintTitle: "Imprimir",
        menuContinuousScrollTitle: "Toggle Continuous Scrolling",
        menuSendMailTitle: "Send an email",
        menuExportText: "Exportar",
        menuExportTitle: "Exportar",
        menuPrintPreviewText: "Mostrar vista previa de impresión",
        menuPrintPreviewTitle: "Mostrar vista previa de impresión",
        menuSearchText: "Buscar",
        menuSearchTitle: "Mostrar búsqueda",
        menuSideMenuTitle: "Toggle Side Menu",
        sendEmailFromLabel: "From:",
        sendEmailToLabel: "To:",
        sendEmailCCLabel: "CC:",
        sendEmailSubjectLabel: "Subject:",
        sendEmailFormatLabel: "Format:",
        sendEmailSendLabel: "Send",
        sendEmailCancelLabel: "Cancel",
        //accessibility string resources
        ariaLabelPageNumberSelector: "Page number selector. Showing page {0} of {1}.",
        ariaLabelPageNumberEditor: "Page number editor",
        ariaLabelExpandable: "Expandable",
        ariaLabelSelected: "Selected",
        ariaLabelParameter: "parameter",
        ariaLabelErrorMessage: "Error message",
        ariaLabelParameterInfo: "Contains {0} options",
        ariaLabelMultiSelect: "Multiselect",
        ariaLabelMultiValue: "Multivalue",
        ariaLabelSingleValue: "Single value",
        ariaLabelParameterDateTime: "DateTime",
        ariaLabelParameterString: "String",
        ariaLabelParameterNumerical: "Numerical",
        ariaLabelParameterBoolean: "Boolean",
        ariaLabelParametersAreaPreviewButton: "Preview the report",
        ariaLabelMainMenu: "Main menu",
        ariaLabelCompactMenu: "Compact menu",
        ariaLabelSideMenu: "Side menu",
        ariaLabelDocumentMap: "Document map area",
        ariaLabelDocumentMapSplitter: "Document map area splitbar.",
        ariaLabelParametersAreaSplitter: "Parameters area splitbar.",
        ariaLabelPagesArea: "Report contents area",
        ariaLabelSearchDialogArea: "Search area",
        ariaLabelSendEmailDialogArea: "Send email area",
        ariaLabelSearchDialogStop: "Stop search",
        ariaLabelSearchDialogOptions: "Search options",
        ariaLabelSearchDialogNavigateUp: "Navigate up",
        ariaLabelSearchDialogNavigateDown: "Navigate down",
        ariaLabelSearchDialogMatchCase: "Match case",
        ariaLabelSearchDialogMatchWholeWord: "Match whole word",
        ariaLabelSearchDialogUseRegex: "Use regex",
        ariaLabelMenuNavigateBackward: "Navigate backward",
        ariaLabelMenuNavigateForward: "Navigate forward",
        ariaLabelMenuStopRendering: "Stop rendering",
        ariaLabelMenuRefresh: "Refresh",
        ariaLabelMenuFirstPage: "First page",
        ariaLabelMenuLastPage: "Last page",
        ariaLabelMenuPreviousPage: "Previous page",
        ariaLabelMenuNextPage: "Next page",
        ariaLabelMenuPageNumber: "Page number selector",
        ariaLabelMenuDocumentMap: "Toggle document map",
        ariaLabelMenuParametersArea: "Toggle parameters area",
        ariaLabelMenuZoomIn: "Zoom in",
        ariaLabelMenuZoomOut: "Zoom out",
        ariaLabelMenuPageState: "Toggle FullPage/PageWidth",
        ariaLabelMenuPrint: "Print",
        ariaLabelMenuContinuousScroll: "Continuous scrolling",
        ariaLabelMenuSendMail: "Send an email",
        ariaLabelMenuExport: "Export",
        ariaLabelMenuPrintPreview: "Toggle print preview",
        ariaLabelMenuSearch: "Search in report contents",
        ariaLabelMenuSideMenu: "Toggle side menu",
        ariaLabelSendEmailFrom: "From email address",
        ariaLabelSendEmailTo: "Recipient email address",
        ariaLabelSendEmailCC: "Carbon Copy email address",
        ariaLabelSendEmailSubject: "Email subject:",
        ariaLabelSendEmailFormat: "Report format:",
        ariaLabelSendEmailSend: "Send email",
        ariaLabelSendEmailCancel: "Cancel sending email",
        //search dialog resources
        searchDialogTitle: "Search in report contents",
        searchDialogSearchInProgress: "searching...",
        searchDialogNoResultsLabel: "No results",
        searchDialogResultsFormatLabel: "Result {0} of {1}",
        searchDialogStopTitle: "Stop Search",
        searchDialogNavigateUpTitle: "Navigate Up",
        searchDialogNavigateDownTitle: "Navigate Down",
        searchDialogMatchCaseTitle: "Match Case",
        searchDialogMatchWholeWordTitle: "Match Whole Word",
        searchDialogUseRegexTitle: "Use Regex",
        searchDialogCaptionText: "Find",
        searchDialogPageText: "page",
        // Send Email dialog resources
        sendEmailDialogTitle: "Send Email",
        sendEmailValidationEmailRequired: "Email field is required",
        sendEmailValidationEmailFormat: "Email format is not valid",
        sendEmailValidationSingleEmail: "The field accepts a single email address only",
        sendEmailValidationFormatRequired: "Format field is required",
        errorSendingDocument: "Error sending report document (Report = '{0}')."
    };
    window.telerikReportViewer ||= {};
    window.telerikReportViewer.sr ||= sr;
})(); 