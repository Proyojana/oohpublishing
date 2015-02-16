/*var dashboarddualbar = "undefined";
if(dashboarddualbar == "undefined")
	dashboarddualbar = Ext.create('MyDesktop.view.projectmanagement.DashboardDualBar');*/

var dashboardobject = Ext.getCmp('dashboardform');

if(!dashboardobject){
	Ext.define('MyDesktop.view.projectmanagement.DashboardForm' ,{
		extend: 'Ext.form.Panel',
		alias : 'widget.dashboardform',
   		id:'dashboardform',
		margin: '10 10 3 10',
		layout: {
              type: 'absolute'
        },
		frame:true,
		requires:['MyDesktop.view.projectmanagement.DashboardBarChart','MyDesktop.view.projectmanagement.DashboardDualBar' ],
		title:'Dashboards',
		defaults: {
			labelWidth: 160,
		},
		defaultType: 'textfield',
		initComponent:function(){
			this.items = [
		/*{
			xtype:'dashboardpiechart',
			//height:400,
			x:10,
		//	y:10
			
			
		},*/
				{
					xtype:'dashboarddualbar',			
					x:550,
				//y:10
				},
			]
			this.callParent();
		}
     }
	 
);
} 


