
Ext.define('MyDesktop.view.projectmanagement.completedprojects.details',{
	extend:'Ext.panel.Panel', 
	alias : 'widget.detailsCP',
   title: 'Details',
    //width: 300,
   // x:0,
   // y:10,
    id:'detailsCP',
   // height: 300,
    requires:['MyDesktop.view.projectmanagement.completedprojects.TitleInfoGrid','MyDesktop.view.projectmanagement.completedprojects.TeamGrid'],
    layout:'accordion',
    defaults: {
        // applied to each contained panel
        //bodyStyle: 'padding:5px'
    },
    layoutConfig: {
        // layout-specific configs go here
        titleCollapse: false,
        animate: true,
        activeOnTop: true
    },
    items: [
       	{
        title: 'Title Info',
        xtype:'titleinfogridCP',
    },
   {
        title: 'Team',
        xtype:'teamgridCP',
    },
    
    ]
});
    
  
 
