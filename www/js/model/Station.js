
Ext.define('App.model.StationModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'StationIdNumber',
            'StationName',
            'StationAddress',
            'StationCity',
            'StationState',
            'StationZip',
            'StationCountry',
            'Latitude',
            'Longitude',

            'StationStatus',    //Active // Under Maintenance // Coming Soon
            'StationFuelTypeCNG',
            'StationFuelTypeLNG',
            'StationFuelTypeDSL',
            'StationFuelTypeRDM',

            'VehicleTypesCarsAndVans',
            'VehicleTypesBoxTrucks',
            'VehicleTypesSemiTrucks',
            'HoursOpenIs24H',
            'HoursOpenFrom',
            'HoursOpenTo',


            'PaymentTypesAcceptedAmex',
            'PaymentTypesAcceptedCleanEnergyFuelCard',
            'PaymentTypesAcceptedComData',
            'PaymentTypesAcceptedDiscover',
            'PaymentTypesAcceptedEFS',

            'PaymentTypesAcceptedFuelmanFleetwide',
            'PaymentTypesAcceptedLegacyEFS',
            'PaymentTypesAcceptedMasterCard',
            'PaymentTypesAcceptedMasterCardFleet',
            'PaymentTypesAcceptedPFGiftCard',

            'PaymentTypesAcceptedSpeedway',
            'PaymentTypesAcceptedTCH',
            'PaymentTypesAcceptedTcheck',
            'PaymentTypesAcceptedVisa',
            'PaymentTypesAcceptedVisaFleet',

            'PaymentTypesAcceptedVoyager',
            'PaymentTypesAcceptedWrightExpress',
            'PaymentTypesAcceptedWEXFleetone',

            'PaymentTypesAcceptedTranStar',
            'PaymentTypesAcceptedNaturalFuels',

            'CNG3000PSI',   // FlowRateLow
            'CNG3000StandardNozzle',    // FlowRateMedium
            'CNG3000HighFlowNozzle' // FlowRateHigh
        ]
    }
});

Ext.define('App.store.StationStore', {
    extend: 'Ext.data.Store',
    config: {
        model: "App.model.StationModel",
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/stations.json',
            reader: {
                type: 'json',
                totalProperty: 'totalCount',
                rootProperty: 'stations',
                successProperty: 'success'
            }
        }
    }
});

