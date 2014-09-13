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
		
		{
				xtype:'button',
				text:'Save + Next',
                x:450,
                y:350,
				pressed:true,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {
					var job_code=Ext.getCmp('job_code').getValue();
					var project_id=Ext.getCmp('addnotesHeader_projectID').getValue();
					var dateresolved='';
					var narrative='';
					var dateraised='';
					var notes_id='';
					var grid=Ext.getCmp('newprojectNotesgrid');

					var myStore = Ext.getCmp('newprojectNotesgrid').getStore();
					myStore.each( function(rec) {

						dateresolved=dateresolved+rec.get('dateresolved')+',';
						narrative=narrative+rec.get('narrative')+',';
						dateraised=dateraised+rec.get('dateraised')+',';
						notes_id=notes_id+rec.get('id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/notes.php',
						method: 'POST',
						params : {
							action:2,
							project_id:project_id,
							dateresolved:dateresolved,
							narrative:narrative,
							dateraised:dateraised,
							notes_id:notes_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//refresh grid
							var grid3=Ext.getCmp('newprojectNotesgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});
							
							
								Ext.getCmp('newprojectartworkformTab').setDisabled(false);
							 var currentHeaderForm = Ext.getCmp('createprojectArtworkHeaderForm');
							

							currentHeaderForm.getForm().load({
								url: 'service/Artwork.php',
								params: {
									action:5,
									job_code:job_code
								},
								
							});
							Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectartworkformTab');


                         
						}
						
						
					});

				}
			},
	
			]
	  
	
		this.callParent();
	}
     
}); 
