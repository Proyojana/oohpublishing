Ext.define('MyDesktop.view.projectmanagement.Archives.ArchivesTabPanel',{
		extend:'Ext.tab.Panel',
		id:'archivestab',
		alias:'widget.archivestab',
		
		requires:['MyDesktop.view.projectmanagement.Archives.ArchivesGrid'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [
                    {
                                     	
                   xtype:'archivesgrid'
                    }
                    ]
	});