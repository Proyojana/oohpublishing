Ext.define('MyDesktop.view.projectmanagement.DashboardForm' ,{
	extend: 'Ext.form.Panel',
	alias : 'widget.dashboardform',
   		id:'dashboardform',
		margin: '10 10 3 10',
		layout: {
              type: 'absolute'
        },
		closeAction : 'hide',
		frame:true,
		requires:['MyDesktop.view.projectmanagement.DashboardBarChart','MyDesktop.view.projectmanagement.DashboardDualBar' ],
		title:'Dashboards',
		defaults: {
			labelWidth: 160,
		},
		defaultType: 'textfield',
		/*items : [
		{
			xtype:'dashboardpiechart',
			x:10,
		},
		{
			xtype:'dashboarddualbar',			
			x:550,
		},
		]*/
     }
	 
);



