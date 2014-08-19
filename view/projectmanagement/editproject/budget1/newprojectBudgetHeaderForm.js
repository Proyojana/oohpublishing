var required = '<span style= "color:red;font-weight:bold" data-qtip="Required">*</span>';
var times = Ext.create('Ext.data.Store', {
        fields: ['unit'],
        data : [
           {"unit":"Rate / Unit in USD"},
           {"unit":"Rate / Unit in GBP"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.newprojectBudgetHeaderForm',
	margin:'0 580 240 0',
	id: 'newprojectBudgetHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:105,
	title:'Header Data',
	defaults: {
		labelWidth: 180,
	},
	// collapsible: true,
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'budgetHeader_projectID',
			hidden:true
		},
		{
			id:'budgetHeader_clientId',
			hidden:true
		},
		{
			id:'budgetHeader_workflow',
			hidden:true,
		},
		
		{
		id:'budgetHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:10,
		width:320,
	},
	{
		id:'budgetHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:360,
		y:10,
		readOnly: true,
		width:320,
	},
	{
		id:'budgetHeader_Job',
		fieldLabel: 'Job #',
		emptyText:'Example: JOB001',
		//readOnly: true,
		x:710,
		y:10,
		width:320,
		listeners: {
              specialkey: function(f,e){
                if (e.getKey() == e.ENTER) {
               
                	var project_code = Ext.getCmp("budgetHeader_Job").getValue();
                	
                	//alert(project_code);
                	var currentForm = Ext.getCmp('newprojectBudgetHeaderForm');
                	 /****load data in header form*****/
                	
						
						currentForm.getForm().load({
   								 url: 'service/budget.php',
							     params: {
        						 	action:2,project_code:project_code
							    },
							    success: function(form, action){
					                 var workflow = Ext.getCmp("budgetHeader_workflow").getValue();
					                 var project = Ext.getCmp("budgetHeader_projectID").getValue();
								//load activities in budget grid
									 var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,workflowid:workflow,projectid:project}});
                                },
							    failure: function(form, action){
							    	
						        Ext.Msg.alert("Job Code is not Valid", action.result.errorMessage);
						        currentForm.getForm().reset();
						        var workflow = Ext.getCmp("budgetHeader_workflow").getValue();
								//load activities in budget grid
									 var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,workflowid:workflow}});
    							
    							}
						});
						
						
						
					
            
                }
              }
            }
		//labelWidth: 60,
	},
	{
		id:'budgetHeader_ProjectName',
		fieldLabel: 'Project Name',
		x:10,
		readOnly: true,
		y:40,
		width:320,
		
	},
	/**{
		id:'budgetHeader_Currency',
		xtype:'combo',
		fieldLabel: 'Currency',
		x:310,
		//readOnly: true,
		y:40,
		width:320,
		store:times,
		displayField:'unit',
		listeners : {
				change : function() {
					var currentForm = this.up('newprojectBudgetHeaderForm');
					var currency = Ext.getCmp('budgetHeader_Currency').getValue();
					//change budget grid header
					  if(currency.indexOf("USD")!= -1)
					  {
					  	var grid = Ext.getCmp( 'accountPayableGrid' );
					 grid.getView().getHeaderAtIndex(6).setText('Rate/Unit in USD');
					 grid.getView().getHeaderAtIndex(7).setText('Budgeted Amount in USD');
					 grid.getView().getHeaderAtIndex(9).setText('Actual Amount in USD');
					  }
					  else if(currency.indexOf("GBP")!= -1)
					  {
					  	var grid = Ext.getCmp( 'accountPayableGrid' );
					  grid.getView().getHeaderAtIndex(6).setText('Rate/Unit in GBP');
					 grid.getView().getHeaderAtIndex(7).setText('Budgeted Amount in GBP');
					 grid.getView().getHeaderAtIndex(9).setText('Actual Amount in GBP');
					  }
					 
					
					
				}
			}
		
		
	},***/
	]
	
	this.callParent();
}
});