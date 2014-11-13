Ext.define('MyDesktop.view.projectmanagement.completedprojects.scheduleForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.scheduleformCP',
   		id:'scheduleformCP',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.completedprojects.scheduleGrid'],
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
		xtype : 'schedulegridCP',
		title:'Schedule for production',
		height:200,
		},
		
			]
	  
	
		this.callParent();
	}
     
}); 


