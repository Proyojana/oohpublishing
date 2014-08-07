var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.author.authorPlusForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.authorplusform',
	id:'authorplusform',
	margin: '10 10 10 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
//	title:'Author',
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
			xtype:'numberfield',
			fieldLabel : 'Cambridge 1st',
			hideTrigger:true,
		//	allowBlank: false,
		//	afterLabelTextTpl: required,

		},
		{
			x:10,
			y:40,
			xtype:'numberfield',
			fieldLabel : 'Proofreader',
			hideTrigger:true,
		//	allowBlank: false,
		//	afterLabelTextTpl: required,

		},
		{
			x:10,
			y:70,
			xtype:'numberfield',
			fieldLabel : 'LateX',
			hideTrigger:true,
		//	allowBlank: false,
		//	afterLabelTextTpl: required,

		},
		{
			x:10,
			y:100,
			xtype:'numberfield',
			fieldLabel : 'Additional sets',
			hideTrigger:true,
		//	allowBlank: false,
		//	afterLabelTextTpl: required,

		},
		{
			x:120,
			y:150,
			xtype:'button',
			id:'plus_save',
			text:'Save',
			pressed:true,
			handler:function()
			{
				//alert("save");				
			}
		}
		
		

		]

		this.callParent();
	}
});