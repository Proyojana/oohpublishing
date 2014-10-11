 Ext.define('MyDesktop.model.budget', {
        extend: 'Ext.data.Model',
        fields: [
            
             'budgetExpense_id','activityid','activity','vendor' ,'no_of_unit', 'rate_USD','rate_GBP','budgeted_amount_USD','budgeted_amount_GBP','actual_amount_USD','actual_amount_GBP','activity_name'       
        ],
      //  idProperty: 'cityname'
    });