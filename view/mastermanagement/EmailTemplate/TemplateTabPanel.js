Ext.define('MyDesktop.view.mastermanagement.EmailTemplate.TemplateTabPanel',{
		extend:'Ext.tab.Panel',
		id:'templatetab',
		alias:'widget.templatetab',
		
		requires:['MyDesktop.view.mastermanagement.EmailTemplate.TemplateForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'templateform'}]
	});