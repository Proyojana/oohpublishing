 Ext.define('MyDesktop.model.budget', {
        extend: 'Ext.data.Model',
        fields: [
            
             'budgetExpense_id','activityid','activity','currency_rate','unit_of_measurement','vendor' ,'no_of_unit', 'rate_USD_GBP','budgeted_amount_USD_GBP','actual_amount_USD_GBP','activity_name'       
        ],
      //  idProperty: 'cityname'
    });