
Ext.define('MyDesktop.view.projectmanagement.currentprojects.details',{
	extend:'Ext.panel.Panel', 
	alias : 'widget.details',
   title: 'Details',
    //width: 300,
 //   x:0,
  //  y:10,
    id:'details',
   // height: 300,
    requires:['MyDesktop.view.projectmanagement.currentprojects.TitleInfoGrid','MyDesktop.view.projectmanagement.currentprojects.TeamGrid'],
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
        xtype:'titleinfogrid',
    },
   {
        title: 'Team',
        xtype:'teamgrid',
    },
    
    ]
});
    
  
 
