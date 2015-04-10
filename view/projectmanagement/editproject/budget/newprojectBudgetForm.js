Ext.override(Ext.form.NumberField, {
    forcePrecision : false,

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        if (isNaN(value))
        {
          value = '';
        } else {
          value = me.forcePrecision ? value.toFixed(me.decimalPrecision) : parseFloat(value);
          value = String(value).replace(".", decimalSeparator);
        }
        return value;
    }
});

var type = Ext.create('Ext.data.Store', {
    fields: ['id', 'name'],
    data: [{
        "id": "1",
        "name": "by Project"
    }, {
        "id": "2",
        "name": "by Activity"
    }]
});
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.newprojectBudgetForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.editBudgetForm',
    id: 'editBudgetForm',
    margin: '10 10 10 10',
    layout: {
        type: 'absolute'
    },
    frame: true,

    requires: ['MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm', 'MyDesktop.view.projectmanagement.editproject.budget.editaccountPayableGrid', 'MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid_a'/*,
        'MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid'*/
    ],
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',

    initComponent: function() {

        this.items = [

            /*{
                xtype: 'combo',
                x: 10,
                y: 10,
                fieldLabel: 'Receivable type',
                store: type,
                id: 'receive2',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    afterrender: function(combo) {
                        var recordSelected = combo.getStore().getAt(0);
                        combo.setValue(recordSelected.get('id'));
                    },
                    change: function(combo) {
                        var val = Ext.getCmp('receive2').getValue();
                        if (val == 1) {
                            Ext.getCmp('editaccountReceiveGrid_a').hide();
                            Ext.getCmp('editaccountReceiveGrid').show();
                            Ext.getCmp('edit_total_receive_USD').hide();
                            Ext.getCmp('edit_total_receive_GBP').hide();
                            Ext.getCmp('edit_total_receive_USD_p').show();
                            Ext.getCmp('edit_total_receive_GBP_p').show();

                        } else {
                            Ext.getCmp('editaccountReceiveGrid').hide();
                            Ext.getCmp('editaccountReceiveGrid_a').show();
                            Ext.getCmp('edit_total_receive_USD_p').hide();
                            Ext.getCmp('edit_total_receive_GBP_p').hide();
                            Ext.getCmp('edit_total_receive_USD').show();
                            Ext.getCmp('edit_total_receive_GBP').show();

                        }
                    }
                }

            }, {
                xtype: 'editaccountReceiveGrid',
                x: 5,
                y: 50,
                height: 200,
            },*/ 
			{
            	xtype:'fieldset',
        		layout: 'hbox',
        		title: 'Budget Receivable',
             x:0,
			//y:160,
			layout:'absolute',
			height:380,
			items :[
			{
                xtype: 'editaccountReceiveGrid_a',
                x: 5,
                y: 20,
                height: 200,
            },
            /**old column*/
            {
                xtype: 'numberfield',
                id: 'edit_total_receive_USD',                
                
                hideTrigger:true,
                fieldLabel: 'Budgeted Receivable amount in $',
                x: 5,
                y: 240,
                forcePrecision: true,       
                decimalPrecision: 2,
                // width:400,
                labelWidth: 220,
            },
            {
                xtype: 'numberfield',
                id: 'edit_total_receive_budgeted_GBP',                
                
                hideTrigger:true,
                fieldLabel: 'Budgeted Receivable amount in £',
                x: 5,
                y: 270,
                forcePrecision: true,       
                decimalPrecision: 2,
                // width:400,
                labelWidth: 220,
            },
            {
                xtype: 'numberfield',
                id: 'edit_total_receive_budgeted_total',                
                
                hideTrigger:true,
                fieldLabel: 'Total Budgeted Receivable amount',
                x: 5,
                y: 300,
                forcePrecision: true,       
                decimalPrecision: 2,
                // width:400,
                labelWidth: 220,
            },
            {
							xtype : 'label',
							forId : 'edit_total_pay_budgeted_total_pounds',
							text : 'GBP',
							x : 380,
							y : 305,
			},
            {
                xtype: 'numberfield',
                id: 'edit_total_receive_actual_USD',                
                
                hideTrigger:true,
                fieldLabel: 'Actual Receivable amount in $',
                x: 500,
                y: 240,
                forcePrecision: true,       
                decimalPrecision: 2,
                // width:400,
                labelWidth: 220,
            },
            /**old column*/
            {
                xtype: 'numberfield',
                id: 'edit_total_receive_GBP',
                fieldLabel: 'Actual Receivable amount in £',
                x: 500,
                y: 270,
                //width:400,
                hideTrigger:true,
                labelWidth: 220,
                 forcePrecision: true,    
                  decimalPrecision: 2,
            },
            
            {
                xtype: 'numberfield',
                id: 'edit_total_receive_actual_total',                
                
                hideTrigger:true,
                fieldLabel: 'Total Actual Receivable amount',
                x: 500,
                y: 300,
                forcePrecision: true,       
                decimalPrecision: 2,
                // width:400,
                labelWidth: 220,
            },
            {
							xtype : 'label',
							forId : 'edit_total_pay_actual_total_pounds',
							text : 'GBP',
							x : 875,
							y : 305,
			}
            ]
			},

            /*{
                xtype: 'textfield',
                id: 'edit_total_receive_USD_p',
                fieldLabel: 'Total Receivable amount in $',
                x: 5,
                y: 260,
                // width:400,
                labelWidth: 180,
            }, {
                xtype: 'textfield',
                id: 'edit_total_receive_GBP_p',
                fieldLabel: 'Total Receivable amount in £',
                x: 500,
                y: 260,
                //width:400,
                labelWidth: 180,
            },*/ 
            {
            	xtype:'fieldset',
        		layout: 'hbox',
        		title: 'Budget Payable',
             	x:0,
				y:390,
				layout:'absolute',
				height:370,
			items :[
            {
                xtype: 'editaccountPayableGrid',
                x: 5,
                y: 20,
                height: 200,
            },
            /**old column*/
            {
                xtype: 'numberfield',
                id: 'edit_total_pay_USD',
                fieldLabel: 'Budgeted Payable amount in $',
                x: 5,
                y: 240,
                // width:400,
                hideTrigger:true,
                labelWidth: 180,
                 forcePrecision: true,    
                  decimalPrecision: 2,
            },
             {
                xtype: 'numberfield',
                id: 'edit_total_pay_budgeted_GBP',
                fieldLabel: 'Budgeted Payable amount in £',
                x: 5,
                y: 270,
                // width:400,
                hideTrigger:true,
                labelWidth: 180,
                 forcePrecision: true,    
                  decimalPrecision: 2,
            },
            {
                xtype: 'numberfield',
                id: 'edit_total_pay_budgeted_total',
                fieldLabel: 'Total Budgeted Payable amount',
                x: 5,
                y: 300,
                // width:400,
                hideTrigger:true,
                labelWidth: 180,
                 forcePrecision: true,    
                  decimalPrecision: 2,
            },
            {
							xtype : 'label',
							forId : 'edit_total_pay_budgeted_total_pounds',
							text : 'GBP',
							x : 340,
							y : 305,
			},
            {
                xtype: 'numberfield',
                id: 'edit_total_pay_actual_USD',
                fieldLabel: 'Actual Payable amount in $',
                x: 500,
                y: 240,
                // width:400,
                hideTrigger:true,
                labelWidth: 180,
                 forcePrecision: true,    
                  decimalPrecision: 2,
            },
            /**old column*/
            {
                xtype: 'numberfield',
                id: 'edit_total_pay_GBP',
                fieldLabel: 'Actual Payable amount in £',
                x: 500,
                y: 270,
                //width:400,
                labelWidth: 180,
                hideTrigger:true,
                forcePrecision: true,    
                decimalPrecision: 2,

            },
            {
                xtype: 'numberfield',
                id: 'edit_total_pay_actual_total',
                fieldLabel: 'Total Actual Payable amount',
                x: 500,
                y: 300,
                // width:400,
                hideTrigger:true,
                labelWidth: 180,
                 forcePrecision: true,    
                  decimalPrecision: 2,
            },
            {
							xtype : 'label',
							forId : 'edit_total_pay_actual_total_pounds',
							text : 'GBP',
							x : 835,
							y : 305,
			}
            ]},
            /**old column*/
            	{
                xtype: 'numberfield',
                id: 'edit_profit_GBP',
                fieldLabel: 'Project profit £',
                x: 20,
                y: 775,
                labelWidth: 180,
                hideTrigger:true,
                forcePrecision: true,       
                decimalPrecision: 2,

            },
            {
							xtype : 'label',
							forId : 'edit_profit_GBP_pounds',
							text : 'GBP',
							x : 355,
							y : 780,
			},
            {
                xtype: 'numberfield',
                id: 'edit_profit_percentage',
                fieldLabel: 'Project profit ',
                x: 515,
                y: 775,
                labelWidth: 180,
                hideTrigger:true,
                forcePrecision: true,       
                decimalPrecision: 2,
            },
            {
							xtype : 'label',
							forId : 'edit_profit_percentage_symbol',
							text : 'GBP %',
							x : 850,
							y : 780,
			},

        ]


        this.callParent();
    }

});