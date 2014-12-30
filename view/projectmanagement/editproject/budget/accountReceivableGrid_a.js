var sm = Ext.create('Ext.selection.CheckboxModel', {
    checkOnly: true
});
var encode = false;

Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid_a', {
    extend: 'Ext.grid.Panel',
    title: 'Budget Accounts Receivables',
    alias: 'widget.editaccountReceiveGrid_a',
    closeAction: 'hide',
    width: 1085,
    requires: ['MyDesktop.model.Receivable_a'],
    id: 'editaccountReceiveGrid_a',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function() {
        //load receive store
        var receive = Ext.create('MyDesktop.store.Receivable');
        receive.load({
            params: {
                start: 0,
                limit: 50
            }
        });
        var activity = Ext.create('MyDesktop.store.ProductionStages');
        activity.load({
            params: {
                start: 0,
                limit: 50
            }
        });
        var budget = Ext.create('MyDesktop.store.Receivable_a');
        budget.load({
            params: {
                start: 0,
                limit: 50
            }
        });
        budget.loadPage(1);
        this.store = budget,


            this.columns = [

                {
                    dataIndex: 'budgetReceive_id',
                    hidden: true,
                },
                {
                	 dataIndex: 'activity_name',
                    hidden: true,
                	
                }, {
                    dataIndex: 'activityid',
                    text: 'Activity',
                    flex: 1,
                    align: 'center',
                    editor: {
                        xtype: 'combo',
                        store: activity,
                        queryMode: 'local',
                        displayField: 'product_name',
                        valueField: 'product_id',
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                var grid = this.up().up();
                                // get selection model of the grid  
                                var selModel = grid.getSelectionModel();

                                var job_code = Ext.getCmp('edit_Job_code').getValue();

                                var conn = new Ext.data.Connection();
                                conn.request({
                                    url: 'service/budget.php',
                                    method: 'POST',
                                    params: {
                                        action: 18,
                                        job_code: job_code,
                                        activity: newValue
                                    },
                                    success: function(response) {
                                        obj1 = Ext.JSON.decode(response.responseText);

                                        var rate = obj1.data.rate_USD;
                                        var rate1 = obj1.data.rate_GBP;

                                        selModel.getSelection()[0].set('rate_USD', rate);
                                        selModel.getSelection()[0].set('rate_GBP', rate1);

                                        var rate = selModel.getSelection()[0].data.rate_USD;
                                        var rate1 = selModel.getSelection()[0].data.rate_GBP;
                                        var unit = selModel.getSelection()[0].data.no_of_unit;
                                        //calculate budgeted amount
                                        var budget = unit * rate;
                                        var budget1 = unit * rate1;
                                        selModel.getSelection()[0].set('budgeted_amount_USD', budget);
                                        selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
                                        selModel.getSelection()[0].set('actual_amount_USD', budget);
                                        selModel.getSelection()[0].set('actual_amount_GBP', budget1);

                                        var actual_amt_USD = 0;
                                        var actual_amt_GBP = 0;


                                        var actual_amount_USD = '';
                                        var actual_amount_GBP = '';


                                        var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
                                        myStore.each(function(rec) {
                                            actual_amt_USD = actual_amt_USD + parseInt(rec.get('actual_amount_USD'));
                                            actual_amt_GBP = actual_amt_GBP + parseInt(rec.get('actual_amount_GBP'));

                                            actual_amount_USD = actual_amount_USD + rec.get('actual_amount_USD') + ',';
                                            actual_amount_GBP = actual_amount_GBP + rec.get('actual_amount_GBP') + ',';


                                        });

                                        Ext.getCmp('edit_total_receive_USD').setValue(actual_amt_USD);
                                        Ext.getCmp('edit_total_receive_GBP').setValue(actual_amt_GBP);



                                    }
                                });
                            }
                        }
                    },

                    renderer: function(value) {
                        var index = activity.find('product_id', value);
                       // alert(value);
                        if (index != -1) {
                            return activity.getAt(index).data.product_name;
                        }
                        return value;
                    }
                },

                {
                    text: 'Rate / Unit',

                    columns: [{
                        dataIndex: 'rate_USD',
                        text: '$',
                        align: 'center',
                        textStyle: 'font-size:13px;',
                        editor: {
                            xtype: 'textfield',
                            
                            listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                     // get selection model of the grid  
		                     var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.no_of_unit;
		                //	  var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	//calculate budgeted amount
		                	 var budget=newValue*rate;
		                	 
		                	 
		                	 selModel.getSelection()[0].set('budgeted_amount_USD', budget);
		                	// selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
		                	 selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	// selModel.getSelection()[0].set('actual_amount_GBP', budget1);
						}
						}
                        }


                    }, {
                        dataIndex: 'rate_GBP',
                        text: '£',
                        align: 'center',
                        editor: {
                            xtype: 'textfield',
                            
                            	listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                     // get selection model of the grid  
		                     var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.no_of_unit;
		                //	  var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	//calculate budgeted amount
		                	 var budget1=newValue*rate;
		                	
		                	// selModel.getSelection()[0].set('budgeted_amount_USD', budget);
		                 selModel.getSelection()[0].set('budgeted_amount_GBP', budget1);
		                	// selModel.getSelection()[0].set('actual_amount_USD', budget);
		                	 selModel.getSelection()[0].set('actual_amount_GBP', budget1);
						}
						}
                        }
                    }]
                }, {
                    dataIndex: 'no_of_unit',
                    text: 'No Of Units',
                    flex: 1,
                    align: 'center',
                    editor: {
                        xtype: 'textfield',
                        listeners: {
                            change: function(field, newValue, oldValue) {

                                var grid = this.up().up();
                                var selModel = grid.getSelectionModel();
                                var rate = selModel.getSelection()[0].data.rate_USD;
                                var rate1 = selModel.getSelection()[0].data.rate_GBP;
                                var actual = newValue * rate;
                                var actual1 = newValue * rate1;
                                selModel.getSelection()[0].set('budgeted_amount_USD', actual);
                                selModel.getSelection()[0].set('budgeted_amount_GBP', actual1);
                                selModel.getSelection()[0].set('actual_amount_USD', actual);
                                selModel.getSelection()[0].set('actual_amount_GBP', actual1);

                                var total_USD = 0;
                                var total_GBP = 0;
                                var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
                                myStore.each(function(rec) {
                                    total_USD = total_USD + parseFloat(rec.get('actual_amount_USD'));
                                    total_GBP = total_GBP + parseFloat(rec.get('actual_amount_GBP'));
                                });
                                Ext.getCmp('edit_total_receive_USD').setValue(total_USD);
                                Ext.getCmp('edit_total_receive_GBP').setValue(total_GBP);

                            }
                        }
                    }
                }, {
                    text: 'Budgeted Amount',
                    columns: [{
                        dataIndex: 'budgeted_amount_USD',
                        text: '$',
                        align: 'center',
                      //  editor: {
                         //   xtype: 'numberfield',                           
                         //    hideTrigger:true,
                             decimalPrecision: 2,
                       // },
                           //  sortable: true,
                            // renderer: Ext.util.Format.numberRenderer('000000.00'),

                    }, {
                        dataIndex: 'budgeted_amount_GBP',
                        text: '£',
                        align: 'center',                      
                             decimalPrecision: 2,
                     
                    }]
                }, {
                    text: 'Actual Amount',
                    columns: [{
                        dataIndex: 'actual_amount_USD',
                        text: '$',
                        align: 'center',
                        editor: {
                            xtype: 'numberfield',
                              hideTrigger:true,
                             decimalPrecision: 2,
							listeners: {
                            change: function(field, newValue, oldValue) {
								var calcOldValue = parseFloat(oldValue);
								var calcNewValue = parseFloat(newValue);
								if(oldValue === null || oldValue === undefined || oldValue === '' || oldValue === 'NaN' || oldValue === NaN)
									calcOldValue = 0;
								if(newValue === null || newValue === undefined || newValue === '' || newValue === 'NaN' || newValue === NaN)
								{
									calcNewValue = 0;
									field.setValue('0.00');
								}
								var newUsdValue = parseFloat(Ext.getCmp('edit_total_receive_USD').getValue())- parseFloat(calcOldValue) + parseFloat(calcNewValue);
								Ext.getCmp('edit_total_receive_USD').setValue(newUsdValue);
                            }
                        }
                        },
                             sortable: true,
                             renderer: Ext.util.Format.numberRenderer('000000.00'),


                    }, {
                        dataIndex: 'actual_amount_GBP',
                        text: '£',
                        align: 'center',
                        editor: {
                            xtype: 'numberfield',
                              hideTrigger:true,
                             decimalPrecision: 2,
							listeners: {
                            change: function(field, newValue, oldValue) {
								var calcOldValue = parseFloat(oldValue);
								var calcNewValue = parseFloat(newValue);
								if(oldValue === null || oldValue === undefined || oldValue === '' || oldValue === 'NaN' || oldValue === NaN)
									calcOldValue = 0;
								if(newValue === null || newValue === undefined || newValue === '' || newValue === 'NaN' || newValue === NaN)
								{
									calcNewValue = 0;
									field.setValue('0.00');
								}
								var newGbpValue = parseFloat(Ext.getCmp('edit_total_receive_GBP').getValue())- parseFloat(calcOldValue) + parseFloat(calcNewValue);
								Ext.getCmp('edit_total_receive_GBP').setValue(newGbpValue);
                            }

                            
                        }
                        },
                          sortable: true,
                             renderer: Ext.util.Format.numberRenderer('000000.00'),
                    }]
                },


                {
                    xtype: 'actioncolumn',
                    align: 'center',
                    flex: 1,
                    text: 'Actions',

                    items: [{
                        iconCls: 'deleteClass',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {

                            var grid = this.up('grid');
                            if (grid) {
                                var edit_Job_code = Ext.getCmp('edit_Job_code').getValue();

                                //alert(edit_Job_code);
                                //var workflow=Ext.getCmp('budgetHeader_workflow').getValue();
                                var rec = grid.getStore().getAt(rowIndex);
                                Ext.Msg.confirm('Remove Record ' + rec.get('activity_name') + ' ?', +rec.get('activity_name'), function(button) {
                                    if (button == 'yes') {
                                        var id = rec.get('budgetReceive_id');

                                        //alert(id);
                                        var conn = new Ext.data.Connection();
                                        conn.request(

                                            {
                                                url: 'service/budget.php',
                                                method: 'POST',
                                                params: {
                                                    action: 20,
                                                    receivable_id: id
                                                },
                                                success: function(response) {
                                                    obj = Ext.JSON.decode(response.responseText);
                                                    Ext.Msg.alert('Successfully Deleted', obj.message);
                                                    var grid3 = Ext.getCmp('editaccountReceiveGrid_a');
                                                    grid3.getStore().load({
                                                        params: {
                                                            action: 13,
                                                            job_code: edit_Job_code
                                                        }
                                                    });
                                                    Ext.getCmp('editaccountReceiveGrid_a').getView().refresh();
                                                },
                                                failure: function(response) {
                                                    obj = Ext.JSON.decode(response.responseText);
                                                    Ext.Msg.alert('Deletion Failed !', obj.message);
                                                }
                                            });

                                    }
                                });
                            }


                        }
                    }, ]
                }



            ];

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            items: [{
                    xtype: 'button',
                    text: 'Insert New Row',
                    pressed: true,
                    x: 500,
                    y: 10,
                    width: 100,
                    height: 25,
                    handler: function() {
                        var project_id = Ext.getCmp('editbudgetHeader_projectID').getValue();
                        var conn = new Ext.data.Connection();
                        conn.request({
                            url: 'service/budget.php',
                            method: 'POST',
                            params: {
                                action: 17,
                                project_id: project_id
                            },
                            success: function(response) {
                                obj1 = Ext.JSON.decode(response.responseText);
                                var confirm = obj1.data.confirmed_extent;
                                var cast = obj1.data.castoff_extent;
                                if (confirm != 0 && cast != 0 ) {
                                    var r = Ext.create('MyDesktop.model.Receive_a', {
                                        budgetReceive_id: '',
                                        activity_name: '',
                                        no_of_unit: cast,
                                        rate_USD: '',
                                        rate_GBP: '',
                                        amt_USD: '',
                                        amt_GBP: ''
                                    });
                                    budget.insert(budget.getCount(), r);
                                } else if(confirm != 0 ){
                                    var r = Ext.create('MyDesktop.model.Receive_a', {
                                        budgetReceive_id: '',
                                        activity_name: '',
                                        no_of_unit: confirm,
                                        rate_USD: '',
                                        rate_GBP: '',
                                        amt_USD: '',
                                        amt_GBP: ''
                                    });
                                    budget.insert(budget.getCount(), r);
                                }
                                else
                                {
                                	 var r = Ext.create('MyDesktop.model.Receive_a', {
                                        budgetReceive_id: '',
                                        activity_name: '',
                                        no_of_unit: cast,
                                        rate_USD: '',
                                        rate_GBP: '',
                                        amt_USD: '',
                                        amt_GBP: ''
                                    });
                                    budget.insert(budget.getCount(), r);
                                }
                            }
                        });

                    }
                },

            ]
        });


        this.callParent(arguments);

    }
});