Ext.define('MyDesktop.view.projectmanagement.currentprojects.scheduleForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.scheduleform',
   		id:'scheduleform',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.currentprojects.scheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ScheduleAddForm11'],
    //title:'Schedule for production',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'schedulegrid',
		title:'Schedule for production',
			width:580,
		height:400,
		},
		{
		xtype : 'scheduleaddform11',
		//title:'Schedule for production',
			width:600,
		x:600,
		y:01
		},
		
			]
	  
	
		this.callParent();
	}
     
}); 


