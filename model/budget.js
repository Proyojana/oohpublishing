 Ext.define('MyDesktop.model.budget', {
        extend: 'Ext.data.Model',
        fields: [
            
             'budgetExpense_id','activityid','activity','stageid','stage','vendor' ,'unit','num_units_budgeted',
             'rate_USD','rate_GBP','budgeted_amount_USD','budgeted_amount_GBP','actual_unit','actual_amount_USD','actual_amount_GBP'       
        ],
      //  idProperty: 'cityname'
    });