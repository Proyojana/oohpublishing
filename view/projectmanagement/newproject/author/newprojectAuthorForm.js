var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.author.newprojectAuthorForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.newprojectauthorform',
	id:'newprojectauthorform',
	margin: '10 10 10 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.author.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.ContribGrid','MyDesktop.view.projectmanagement.newproject.author.newprojectAuthorHeaderForm','MyDesktop.view.projectmanagement.newprojectBudget.accountReceivableGrid_a'],
	title:'Author',
	defaults: {
		labelWidth: 120,
	},
	defaultType: 'textfield',

	initComponent: function() {

		this.items = [
		// Job code field
	/*	{
			x:10,
			y:10,
			xtype:'textfield',
			fieldLabel : 'Job #',
			id:'job_author_code',
			allowBlank: false,
			afterLabelTextTpl: required,
			listeners: {
              specialkey: function(f,e){
                if (e.getKey() == e.ENTER) {
                	var job_code= Ext.getCmp('job_author_code').getValue();
                	
                	 
                	 var gridAuthor=Ext.getCmp('new_author_grid');
					gridAuthor.getStore().load({params:{action:2,job_code:job_code}});
					
					 var gridAuthor=Ext.getCmp('new_contrib_grid');
					gridAuthor.getStore().load({params:{action:4,job_code:job_code}});
            
            
                }
              }
             }

		},*/
		{
			xtype:'newprojectAuthorHeaderForm',
			y:0
		},
		// Calling Author/ Editor Grid
		{
			xtype:'new_author_grid',
			y:70,

		},
		// Calling Contributor Grid
		{
			xtype:'new_contrib_grid',
			x:1,
			y:280,
			height:190
		},
		{
			xtype:'button',
			text:'Next',
			width:100,
			x:500,
			y:480,
			handler:function (){
				var job_code=Ext.getCmp('job_code').getValue(); 
				var currentForm = Ext.getCmp('newprojectBudgetHeaderForm');
                	 /****load data in header form*****/
                	
						; 
						currentForm.getForm().load({
   								 url: 'service/budget.php',
							     params: {
        						 	action:2,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,job_code:job_code}});
					var grid4=Ext.getCmp('accountReceiveGrid_a');
									grid4.getStore().load({params:{action:10,job_code:job_code}});
					var grid3=Ext.getCmp('new_author_grid');
									grid3.getStore().load({params:{action:2,job_code:job_code}});
					Ext.getCmp('newprojectbudgetformTab').setDisabled(false);	
					Ext.getCmp('newprojectauthorformTab').setDisabled(false);
					Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectbudgetformTab');	
			}
		}

		]

		this.callParent();
	}
});