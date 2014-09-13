var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.artwork.newprojectArtworkForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectArtworkform',
   		id:'newprojectArtworkform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.artwork.CreateprojectArtworkHeaderForm','MyDesktop.view.projectmanagement.newproject.artwork.CreateprojectArtworkgrid'],
	title:'Artwork',
    defaults: {
        labelWidth: 115,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'createprojectArtworkHeaderForm',
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
			xtype:'createprojectArtworkgrid',
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
				text:'Save',
				pressed:true,
				x:450,y:450,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {
					
					
					var total_cost=0;
					var total_redraws=0;
					var total_relabel=0;
					var total_final=0;
					/*** get value from store**/
					var myStore = Ext.getCmp('createprojectArtworkgrid').getStore();
					myStore.each(function(rec) {
					
				    total_cost=total_cost+parseInt(rec.get('cost'));
				    
				    total_redraws=total_redraws+parseInt(rec.get('redrawsimple'));
				   
				    total_relabel=total_relabel+parseInt(rec.get('relabel'));
				    total_final=total_final+parseInt(rec.get('finalartwrk'));
				    
				   					
				});
				
				Ext.getCmp('add_total_cost').setValue(total_cost);
				Ext.getCmp('add_total_redraws').setValue(total_redraws);
				Ext.getCmp('add_total_relabel').setValue(total_relabel);
				Ext.getCmp('add_total_final').setValue(total_final);
					
					
				//	var job_code=Ext.getCmp('job_code').getValue();
					var project_id=Ext.getCmp('add_ArtworkHeader_projectID').getValue();

				                   var figurenumber='';
                    				var inputformat= '';
                    				var resolution='';
                 					var colourmode='';
                    				var vendorassessment='';
                    				var cnvrt='';
                    				var redrawsimple='';
                    				var redrawcomplex='';
                    				var relabel='';                				
                    				var finalartwrk='';
                    				var cost='';
                    				var comments='';
                    				var artwork_id='';
					var grid=Ext.getCmp('createprojectArtworkgrid');

					var myStore = Ext.getCmp('createprojectArtworkgrid').getStore();
					myStore.each( function(rec) {

						figurenumber=figurenumber+rec.get('figurenumber')+',';
						inputformat=inputformat+rec.get('inputformat')+',';
						resolution=resolution+rec.get('resolution')+',';
						colourmode=colourmode+rec.get('colourmode')+',';
						vendorassessment=vendorassessment+rec.get('vendorassessment')+',';
						cnvrt=cnvrt+rec.get('convert1')+',';
						redrawsimple=redrawsimple+rec.get('redrawsimple')+',';
						redrawcomplex=redrawcomplex+rec.get('redrawcomplex')+',';
						relabel=relabel+rec.get('relabel')+',';
						finalartwrk=finalartwrk+rec.get('finalartwrk')+',';
						cost=cost+rec.get('cost')+',';
						comments=comments+rec.get('comments')+',';
						artwork_id=artwork_id+rec.get('id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Artwork.php',
						method: 'POST',
						params : {
							action:2,
							
							project_id:project_id,
							figurenumber:figurenumber,
							inputformat:inputformat,
							resolution:resolution,
							colourmode:colourmode,
							vendorassessment:vendorassessment,
							cnvrt:cnvrt,
							redrawsimple:redrawsimple,
							redrawcomplex:redrawcomplex,
							relabel:relabel,
							finalartwrk:finalartwrk,
							cost:cost,
							comments:comments,
							artwork_id:artwork_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//refresh grid
							var grid3=Ext.getCmp('createprojectArtworkgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});

						}
					});

				}
			},
	
			]
	  
	
		this.callParent();
	}
     
}); 
