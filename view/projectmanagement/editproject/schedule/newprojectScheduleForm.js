var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectScheduleform',
   		id:'newprojectScheduleform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleHeaderForm','MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleAddForm','MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleGrid'],
	title:'Schedule',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectScheduleHeaderForm',
			x:0,
			y:0
		
			
		},
		
	{
			xtype:'newprojectSchedulegrid',
			x:0,
			y:90
			//xtype:'cityaddform',
						
		},
		/*{
		xtype:'fieldset',
		id:'city_tab',
		plain:true,
		x:0,
		y:260,
		activeTab: 0,
		height:270,
		defaults: {
			bodyStyle:'padding:10px'
		},
		items:[
		{
			xtype:'newprojectScheduleAddform',
			x:1,
			y:270,
			height:260
		}
		*/
	
			]
	  
	
		this.callParent();
	}
     
}); 
