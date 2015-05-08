Ext.define('MyDesktop.view.projectmanagement.currentprojects.productionreport' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.productionreport', 
	id:'productionreport',
	layout: 'anchor',
	
	requires :['MyDesktop.view.projectmanagement.currentprojects.ProductionTitleInfoGrid','MyDesktop.view.projectmanagement.currentprojects.ProductionScheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ProductionTeamGrid',
	'MyDesktop.view.projectmanagement.currentprojects.ProductionBudgetGrid'],
	
    defaults: {
        
        labelWidth: 60,

    },

    defaultType: 'textfield',
	
	initComponent:function(){     
             
    
		this.items  = [		
		{
			fieldLabel:'JOB#',
			id:'productionreport_jobCode',
			style:	{'font-weight':'bold'},
			//readOnly:true,
			width:340,
			labelWidth: 80,
			margin:'10 0 0 10'
		},
		{
			fieldLabel:'Project Title',
			id:'productionreport_projectTtile',
			//readOnly:true,
			labelWidth: 80,
			x:220,
			y:10,
			width:340,
			margin:'10 0 10 10',
			style:	{'font-weight':'bold'}
		},
		
			
			{
			xtype:'label',
			text:'Tilte Info',
			margin:'0 0 0 10',
		    style:	{'font-weight':'bold'}
		},
		{
			xtype:'ptitleinfogrid',
			margin:'10 0 10 10',
			//x:5,
			//y:100,
		},
		{
			xtype:'label',
			text:'Schedule',
			margin:'0 0 0 10',
		    style:	{'font-weight':'bold'}
		},
		{
			xtype:'pschedulegrid',
			margin:'10 0 10 10',
			//x:5,
		//	y:340,
		},	
		{
			xtype:'label',
			text:'Team',
			margin:'10 0 0 10',
		    style:	{'font-weight':'bold'}			
		},
		{
			xtype:'pteamgrid',
			margin:'10 0 10 10',
			
		},
		{
			xtype:'label',
			text: 'Budget: ',
			style:	{'font-weight':'bolder'},
			margin:'0 0 0 10',		
		},	
       {
	       xtype:'pbudgetgrid',
	       margin:'10 0 10 10',
	    
       },
     
			];
			
	this.callParent();
	}
     
}); 


