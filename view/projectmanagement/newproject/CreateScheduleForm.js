Ext.define('MyDesktop.view.projectmanagement.newproject.CreateScheduleForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.createscheduleform',
   		id:'createscheduleform',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.ScheduleProductuionGrid','MyDesktop.view.projectmanagement.newproject.NewCreateScheduleAddForm'],
    title:'Schedule for production',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'scheduleproductiongrid',
		title:'Schedule for production',
			width:550,
		height:310,
		},
		{
		xtype : 'newcreatescheduleaddform',
		//title:'Schedule for production',
			width:500,
		x:580,
		y:00
	}
		
			]
	  
	
		this.callParent();
	}
     
}); 


