Ext.define('MyDesktop.view.departments.DeptTabPanel',{
		extend:'Ext.tab.Panel',
		id:'depttab',
		alias:'widget.depttab',
		
		requires:['MyDesktop.view.departments.DeptForm','MyDesktop.view.departments.DeptGrid'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'deptform'}]
	});