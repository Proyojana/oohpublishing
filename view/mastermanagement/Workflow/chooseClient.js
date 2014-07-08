var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

Ext.define('MyDesktop.view.mastermanagement.Workflow.chooseClient', {
	extend:'Ext.grid.Panel',
	alias : 'widget.chooseclient',
	closeAction: 'hide',
	id:'chooseclient',
	selModel:sm,
	//requires:['MyDesktop.store.TestMaster.TestMasterGridShow','MyDesktop.view.Recruitment.rrf.resource'],
	initComponent: function() {
	var client = Ext.create('MyDesktop.store.Customers');
		
		this.store = client,
	client.loadPage(1),
			this.columns = [
			    {header: 'id',dataIndex:'id',flex:1,hidden:true},
				{header: 'Code',dataIndex:'code',flex:1},
				{header: 'Name',dataIndex:'name',flex:1},
				
        		];
				
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			{
				xtype:'button',
				text:'Submit',
				x:10,
				y:700,
				handler:function(grid, rowIndex, colIndex){
					
					 var code = Ext.getCmp('workflow_code').getValue();
					 
				
				var selection = Ext.getCmp('chooseclient').getSelectionModel().getSelection();
					var c='';
					for (var i=0; i < selection.length; i++) {
						
					console.log(selection[i].data.id);
					
					c = c + selection[i].data.id+',';
					alert(c);
					} 
				  var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/Workflow.php',
					 method: 'POST',
					 params : {action:6,code:code,clients:c},
					 success:function(response){
					 obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
					/* 	var grid1=Ext.getCmp('wfkrasgrid');
						grid1.getStore().load({params:{action:9,secid:secid,tid:tid}});
						var grid2=Ext.getCmp('sectionselectiongrid');
						grid2.getStore().load({params:{action:1,code:code}}); */
					 }
					 });
					 var grid1=Ext.getCmp('clientgrid');
						grid1.getStore().load({params:{action:6,workflow_code:code}});
						
						
					
				}
				
			},
			{
				xtype:'button',
				text:'Cancel',
				x:10,
				y:1000,
			}
			]
			
		})
		
		this.callParent(arguments);

	}
});


