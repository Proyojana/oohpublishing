var type = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        data : [
         {"id":"1", "name":"by Project"},
            {"id":"2", "name":"by Activity"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectBudgetForm',
   		id:'newprojectBudgetForm',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
    autoScroll:true,
	frame:true,
	title:'Budget',
	requires:['MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm','MyDesktop.view.projectmanagement.newprojectBudget.accountPayableGrid','MyDesktop.view.projectmanagement.newprojectBudget.accountsReceivableForm',
	'MyDesktop.view.projectmanagement.newprojectBudget.accountReceivableGrid','MyDesktop.view.projectmanagement.newprojectBudget.accountReceivableGrid_a'],
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectBudgetHeaderForm',
		},
		{
							xtype:'combo',
							x:10,
							y:120,
							fieldLabel:'Receivable type',
							store: type,
							id:'receive1',
					        queryMode: 'local',
					        displayField: 'name',
					        valueField: 'id',
					        	listeners: {
					        		afterrender: function(combo){
					        	var recordSelected = combo.getStore().getAt(0);                     
                                combo.setValue(recordSelected.get('id'));
                             },
                            change: function(combo) {
                                var val = Ext.getCmp('receive1').getValue();
                                if(val==1){
                                	Ext.getCmp('accountReceiveGrid_a').hide();
                                	Ext.getCmp('accountReceiveGrid').show();
                                }
                                else{
                                		Ext.getCmp('accountReceiveGrid').hide();
                                		Ext.getCmp('accountReceiveGrid_a').show();
                                }
                               } 
                        }
							
					},
		{
			xtype:'accountReceiveGrid',
			x:5,
			y:150,
			height:200,
		},
		{
			xtype:'accountReceiveGrid_a',
			x:5,
			y:150,
			height:200,
		},
		{
		xtype:'textfield',
		  id:'total_receive_USD',
		  fieldLabel: 'Total Receivable amount in $',
		  x:5,
		  y:360,
		 // width:400,
		  labelWidth: 180,
		},
		{
		xtype:'textfield',
		  id:'total_receive_GDP',
		  fieldLabel: 'Total Receivable amount in £',
		  x:500,
		  y:360,
		  //width:400,
		  labelWidth: 180,
		},
		{
			xtype:'accountPayableGrid',
			x:5,
			y:400,
			height:200,
		},
		{
		xtype:'textfield',
		  id:'total_pay_USD',
		  fieldLabel: 'Total Payable amount in $',
		  x:5,
		  y:610,
		  labelWidth: 180,
		},
		{
		xtype:'textfield',
		  id:'total_pay_GDP',
		  fieldLabel: 'Total Payable amount in £',
		  x:500,
		  y:610,
		 labelWidth: 180,
		},
		{
		xtype:'textfield',
		  id:'profit_GDP',
		  fieldLabel: 'Project profit £',
		  x:5,
		  y:660,
		  labelWidth: 180,
		  	    listeners:{ 
						"blur": function(field, newValue, oldValue){
							var receive_usd = Ext.getCmp('edit_total_receive_USD').getValue();
							var pay_usd = Ext.getCmp('edit_total_pay_USD').getValue();
							var bal=receive_usd-pay_usd;
							 
					 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:15},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 if(obj1.data!=null)
					 {
					 var obj=obj1.data.rate;
					 var val = obj*bal;
					 Ext.getCmp('edit_profit_GBP').setValue(val);
					 }
					 else
					 {
					 	Ext.getCmp('edit_profit_GBP').setValue();
					 }
					 }
					 });
							
						}
						}
		},
		{
		xtype:'textfield',
		  id:'profit_percentage',
		  fieldLabel: 'Project profit %',
		  x:500,
		  y:660,
		 labelWidth: 180,
		 	  listeners:{ 
						"blur": function(field, newValue, oldValue){
							var receive_gdp = Ext.getCmp('edit_total_receive_GBP').getValue();
							var pay_gdp = Ext.getCmp('edit_total_pay_GBP').getValue();
							var bal=receive_gdp-pay_gdp;
							if(bal!=0){
							Ext.getCmp('edit_profit_GBP').setValue(bal);
							}
							
							
						}
						}
		},
		//budget total save starts
		{
			xtype:'button',
		    text:'Save',
		    x:300,
		    width:100,
	        y:720,
	        handler:function(){
	        	var projectID=Ext.getCmp('budgetHeader_projectID').getValue();
	        	var ponumber1=Ext.getCmp('budgetHeader_ponumber1').getValue();
	        	var ponumber2=Ext.getCmp('budgetHeader_ponumber2').getValue();
	        	var total_receive_USD=Ext.getCmp('total_receive_USD').getValue();
	        	var total_receive_GDP=Ext.getCmp('total_receive_GDP').getValue();
	        	var total_pay_USD=Ext.getCmp('total_pay_USD').getValue();
	        	var total_pay_GDP=Ext.getCmp('total_pay_GDP').getValue();
	        	var profit_GDP=Ext.getCmp('profit_GDP').getValue();
	        	var profit_percentage=Ext.getCmp('profit_percentage').getValue();
	        		 var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:14,projectID:projectID,ponumber1:ponumber1,ponumber2:ponumber2,total_receive_USD:total_receive_USD,total_receive_GDP:total_receive_GDP,total_pay_USD:total_pay_USD,total_pay_GDP:total_pay_GDP,profit_GDP:profit_GDP,profit_percentage:profit_percentage},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
	        	
	        	
	        	//save receivable 
	        	 var val = Ext.getCmp('receive1').getValue();
	        	
	        	 if(val==1)
	        	 {
	        	var job_code=Ext.getCmp('job_code').getValue();
					 var projectID=Ext.getCmp('budgetHeader_projectID').getValue();
					 
					 var no_of_unit = '';  
				     var rate_USD = '';
				     var rate_GBP= '';
				     var budgeted_amount_USD= '';
				     var budgeted_amount_GBP = '';
				     var actual_amount_USD = '';
				     var actual_amount_GBP = '';
				     var grid=Ext.getCmp('accountReceiveGrid');
				   
				     var myStore = Ext.getCmp('accountReceiveGrid').getStore();
					myStore.each(function(rec) {
						no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
						rate_USD=rate_USD+rec.get('rate_USD')+',';
						rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
						budgeted_amount_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
						budgeted_amount_GBP=budgeted_amount_USD+rec.get('budgeted_amount_GBP')+',';
						actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
						actual_amount_GBP=actual_amount_USD+rec.get('actual_amount_GBP')+',';
					});
					
					 var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:6,job_code:job_code,projectID:projectID,rate_USD:rate_USD,rate_GBP:rate_GBP,no_of_unit:no_of_unit,budgeted_USD:budgeted_amount_USD,budgeted_GBP:budgeted_amount_GBP,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					}else
					{
						
					 var job_code=Ext.getCmp('job_code').getValue();
					 var projectID=Ext.getCmp('budgetHeader_projectID').getValue();  
					 var activity_name = '';
					 var no_of_unit = '';
				     var rate_USD = '';
				     var rate_GBP= '';
				     var budgeted_amount_USD= '';
				     var budgeted_amount_GBP = '';
				     var actual_amount_USD = '';
				      var actual_amount_GBP = '';
				     var grid=Ext.getCmp('accountReceiveGrid_a');
				     /**variable declaration**/
					var total_USD=0;
					var total_GBP=0;
					
					
				     var myStore = Ext.getCmp('accountReceiveGrid_a').getStore();
					 myStore.each(function(rec) {
						total_USD=total_USD+parseInt(rec.get('actual_amount_USD'));
						total_GBP=total_GBP+parseInt(rec.get('actual_amount_GBP'));
						type=1;
						activity_name=activity_name+rec.get('activity_name')+',';
						no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
						rate_USD=rate_USD+rec.get('rate_USD')+',';
						rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
						budgeted_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
						budgeted_GBP=budgeted_amount_USD+rec.get('budgeted_amount_GBP')+',';
						actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
						actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
					});
					
					 var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:11,job_code:job_code,projectID:projectID,activity_name:activity_name,no_of_unit:no_of_unit,rate_USD:rate_USD,rate_GBP:rate_GBP,budgeted_USD:budgeted_USD,budgeted_GBP:budgeted_GBP,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					 Ext.getCmp('total_receive_USD').setValue(total_USD);
					 Ext.getCmp('total_receive_GDP').setValue(total_GBP);
												
						
					}
					
					
			//account payable bottom 
			
			       	var actual_amt_USD=0;
					var actual_amt_GBP=0;
					var type=2;
					var job_code=Ext.getCmp('job_code').getValue(); 
					var projectID=Ext.getCmp('budgetHeader_projectID').getValue(); 
					
							var activity='';
							var vendor='';
							var no_of_unit='';
							var rate_USD='';
							var rate_GBP='';
							var budgeted_amount_USD='';
							var budgeted_amount_GBP='';
							var actual_amount_USD='';
							var actual_amount_GBP='';
							var budget_id='';
							var grid=Ext.getCmp('accountPayableGrid');
							
					var myStore = Ext.getCmp('accountPayableGrid').getStore();
					myStore.each(function(rec) {
					actual_amt_USD=actual_amt_USD+parseInt(rec.get('actual_amount_USD'));
				    actual_amt_GBP=actual_amt_GBP+parseInt(rec.get('actual_amount_GBP'));	
				    activity=activity+rec.get('activityid')+',';
				    vendor=vendor+rec.get('vendor')+',';
				    no_of_unit=no_of_unit+rec.get('no_of_unit')+',';
				    //budgeted_unit=budgeted_unit+rec.get('num_units_budgeted')+',';
				    rate_USD=rate_USD+rec.get('rate_USD')+',';
				    rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
				    budgeted_amount_USD=budgeted_amount_USD+rec.get('budgeted_amount_USD')+',';
				    budgeted_amount_GBP=budgeted_amount_GBP+rec.get('budgeted_amount_GBP')+',';
				    actual_amount_USD=actual_amount_USD+rec.get('actual_amount_USD')+',';
				    actual_amount_GBP=actual_amount_GBP+rec.get('actual_amount_GBP')+',';
				    budget_id=budget_id+rec.get('budgetExpense_id')+',';
				   					
				});
							
					var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:4,job_code:job_code,budget_id:budget_id,activity:activity,vendor:vendor,no_of_unit:no_of_unit,rate_USD:rate_USD,rate_GBP:rate_GBP,
							budgeted_amount_USD:budgeted_amount_USD,budgeted_amount_GBP:budgeted_amount_GBP,actual_amount_USD:actual_amount_USD,actual_amount_GBP:actual_amount_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							
						Ext.getCmp('newprojectscheduleformTab').setDisabled(false);	
								
								//refresh grid
							var grid3=Ext.getCmp('accountPayableGrid');
							grid3.getStore().load({params:{action:1,job_code:job_code}});
							

					
						}
					});
					 Ext.getCmp('total_pay_USD').setValue(actual_amt_USD);
					 Ext.getCmp('total_pay_GDP').setValue(actual_amt_GBP);
					
					
	        	
	        }
		},
		//budget total save ends
		
		{
		xtype:'button',
		text:'Next',
		x:470,
		width:100,
	    y:720,
		handler:function(){
			var job_code=Ext.getCmp('job_code').getValue(); 
				var workflow=Ext.getCmp('budgetHeader_workflow').getValue(); 
			Ext.getCmp('newprojectscheduleformTab').setDisabled(false);	
			var grid3=Ext.getCmp('newprojectSchedulegrid');
			 grid3.getStore().load({params:{action:2,workflowid:workflow}});
		var currentHeaderForm = Ext.getCmp('newprojectScheduleHeaderForm');
                	 /****load data in header form*****/
                	
						
						currentHeaderForm.getForm().load({
   								 url: 'service/schedule.php',
							     params: {
        						 	action:1,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectscheduleformTab');
		}
	}
		/*{
		xtype:'tabpanel',
		id:'newprojectBudgetAccountForm',
		plain:true,
		x:5,
		y:120,
		activeTab: 0,
		height:370,
		
		items:[{
			
			xtype:'accountPayableGrid'
		},
		{
			
			xtype:'accountsReceivableForm'
		}
		]
		},*/
	
			]
	  
	
		this.callParent();
	}
     
}); 
