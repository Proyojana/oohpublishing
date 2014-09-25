var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.currentprojects.Typesetting_html_form' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.typesetting_html_form',
   		id:'typesetting_html_form',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	//requires:['MyDesktop.view.projectmanagement.currentprojects.scheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ScheduleAddForm11'],
    //title:'Schedule for production',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		this.items = [
			           {
							xtype : 'textfield',
							x : 10,
							y : 10,
							fieldLabel:'From',
							id:'typesetting_html_from',
							width:700
						},{
							xtype:'textfield',
							fieldLabel:'To',
							id:'typesetting_html_to',
							x:10,
							y:40,
							
							width:700,
							allowBlank: false,
							afterLabelTextTpl: required,
						},
						{
							xtype:'textfield',
							fieldLabel:'Cc',
							//multiSelect:true,
							id:'typesetting_html_cc',
							x:10,
							y:70,
							
							width:700
						},
						{
							xtype:'textarea',
							fieldLabel:'Message',
							id:'typesetting_html_message',
							x:10,
							y:100,
							width:700,
							height:200
						},

						]
					
		this.callParent();
	}
     
}); 


