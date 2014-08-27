var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.notes.newprojectNotesForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectNotesform',
   		id:'newprojectNotesform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.notes.NotesHeaderForm','MyDesktop.view.projectmanagement.newproject.notes.CreateNotesGrid'],
	title:'Notes',
    defaults: {
        labelWidth: 115,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectNotesHeaderForm',
			x:0,
			y:0
		
			
		},
		/*{
			fieldLabel:'Project Start Date',
			id:'schedule_projectStartDate',
			xtype:'datefield',
			x:15,
			y:80,
			width:260,	
			afterLabelTextTpl: required,
				},*/
		
	{
			xtype:'newprojectNotesgrid',
			x:0,
			y:120
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