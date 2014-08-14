Ext.define('MyDesktop.view.projectmanagement.currentprojects.productionreport' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.productionreport', 
	id:'productionreport',
	layout: {
                 type: 'absolute'
            },
	
	requires :['MyDesktop.view.projectmanagement.currentprojects.ProductionTitleInfoGrid','MyDesktop.view.projectmanagement.currentprojects.ProductionScheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ProductionTeamGrid',
	'MyDesktop.view.projectmanagement.currentprojects.ProductionBudgetGrid','MyDesktop.view.projectmanagement.currentprojects.productionReport_HeaderForm'],
	
    defaults: {
        
        labelWidth: 200,

    },

    defaultType: 'textfield',
	
	initComponent:function(){     
             
    
		this.items  = [		
		
		/**{
			xtype:'label',
			text:'Current Status',
			x:05,
			y:10,
			style:	{'font-weight':'bold'}
		},
		{			
		    x:100,
			y:10,	
			height:19,
			//width:160,	
			},
		{
			xtype:'label',
			text:'On Schedule',
			x:235,
			y:10,
			style:	{'font-weight':'bold'}
		},
		{			
		    x:315,
			y:10,	
			height:19,
			//width:160,	
			},
		{
			xtype:'label',
			text:'OOH job#',
			x:450,
			y:10,
			style:	{'font-weight':'bold'}
		},
		{			
		    x:515,
			y:10,	
			height:19,
			//width:160,	
			},**/
			{
				xtype:'productionReport_HeaderForm',
				x:0,
				y:0,
				height:80
			},
		{
			xtype:'ptitleinfogrid',
			x:5,
			y:100,
		},
		{
			xtype:'label',
			text:'Schedule',
			x:05,
			y:325,
		    style:	{'font-weight':'bold'}
		},
		{
			xtype:'pschedulegrid',
			x:5,
			y:340,
		},	
		{
			xtype:'label',
			text:'Team',
			x:05,
			y:453,
		    style:	{'font-weight':'bold'}			
		},
		{
			xtype:'pteamgrid',
			x:5,
			y:470
		},
		{
			xtype:'label',
			text: 'Budget: ',
			x:05,
			y:560	,	
			style:	{'font-weight':'bold'}			
		},	
       {
	       xtype:'pbudgetgrid',
	       x:5,
	       y:580
       }	
			];
			
			
	/* bbar:
    [
        this.items = [
		
		 {
            xtype:'button',
            //formBind: true,
            fieldLabel:'submit',
         //   action:'submitAction',
            text:'Submit',
          //  defaultAlign:'t1-c'
            //flex:6,
        },
			
			
		
			]
    ]*/
	
		this.callParent();
	}
     
}); 


