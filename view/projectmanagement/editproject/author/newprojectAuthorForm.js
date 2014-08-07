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
	requires:['MyDesktop.view.projectmanagement.newproject.author.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.ContribGrid'],
	title:'Author',
	defaults: {
		labelWidth: 120,
	},
	defaultType: 'textfield',

	initComponent: function() {

		this.items = [
		// Job code field
		{
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

		},
		// Calling Author/ Editor Grid
		{
			xtype:'new_author_grid',
			y:50,

		},
		// Calling Contributor Grid
		{
			xtype:'new_contrib_grid',
			x:1,
			y:300,
			height:220
		}

		]

		this.callParent();
	}
});