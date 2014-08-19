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
			height:150,
		},
		{
			xtype:'accountReceiveGrid_a',
			x:5,
			y:150,
			height:150,
		},
		{
xtype:'textfield',
  id:'total_receive_USD',
  fieldLabel: 'Total Receivable amount in $',
  x:5,
  y:310,
 // width:400,
  labelWidth: 180,
},
{
xtype:'textfield',
  id:'total_receive_GDP',
  fieldLabel: 'Total Receivable amount in £',
  x:500,
  y:310,
  //width:400,
  labelWidth: 180,
},
		{
			xtype:'accountPayableGrid',
			x:5,
			y:340,
			height:200,
		},
		{
		xtype:'textfield',
		  id:'total_pay_USD',
		  fieldLabel: 'Total Payable amount in $',
		  x:5,
		  y:550,
		 // width:400,
		  labelWidth: 180,
		},
		{
		xtype:'textfield',
		  id:'total_pay_GDP',
		  fieldLabel: 'Total Payable amount in £',
		  x:500,
		  y:550,
		  //width:400,
		  labelWidth: 180,
		},
		{
		xtype:'button',
		text:'Next',
		x:400,
		width:100,
	    y:570,
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
