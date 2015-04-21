var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

Ext.define('MyDesktop.view.projectmanagement.completedprojects.PublisherGrid', {
	extend:'Ext.grid.Panel',
	title: 'List Of Projects',
	alias:'widget.publishergridCP',
	closeAction: 'hide',
	selModel:sm,
	//anchor: '76% 49%',
	requires:['MyDesktop.store.completedprojects'],
	id:'publishergridCP',
	initComponent: function() {
		
		var completed = Ext.create('MyDesktop.store.completedprojects');
		completed.load({
			params: {
				start: 0,
				limit: 10,
				
			}
		});
		completed.loadPage(1);
		this.store = completed,
		this.columns = [
	{
					dataIndex: 'id',
					hidden:true
				},
                              {
					dataIndex: 'code',
					text: 'Project Code',
					align: 'left',
					flex:1.5,
					
				},
				{
					dataIndex: 'title',
					text: 'Title',
					align: 'left',
					flex:1.5,
					
				},
				{
					dataIndex: 'author',
					text: 'Author',
					align: 'left',
					flex:1,
				},
				
				{
					dataIndex: 'design',
					text: 'Design',
					align: 'center',
					flex:1,
					
				},
				{
					dataIndex: 'series',
					text: 'Series',
					align: 'center',
					flex:1,
				},
				{
					dataIndex: 'format',
					text: 'Format',
					align: 'left',
					flex:0.5,
					
				},
				
				{
					dataIndex: 'deadline',
					text: 'Agreed Deadline',
					align: 'center',
					flex:1,
					
				},
{
					dataIndex: 'word_count',
					text: 'Word Count',
					align: 'center',
					flex:1,
					
				},
				
				{
					xtype:'actioncolumn',
					align: 'center',
					flex:1,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					   
					   var rec = grid.getStore().getAt(rowIndex);
					var project_id=rec.get('id');
					var job_code=rec.get('code');
					
					//alert(project_id);
					//alert(job_code);	
					
					
					
					/*Title information grid loading*/
					
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/completedprojects.php',
						method: 'POST',
						params : {
							action:8,
							project_id:project_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							//	Ext.Msg.alert(obj.message);
							var myGrid = Ext.getCmp('titleinfogridCP');
							myGrid.setSource(obj);
						},
					});
					
					
					/*Team information grid loading*/
					
					var gridTeam=Ext.getCmp('teamgridCP');
					gridTeam.getStore().load({
						params: {
							action:12,
							project_id:project_id
						}
					});
					
					
					/*bottom grid loading*/
					
					var gridAuthor=Ext.getCmp('authorCP');
					gridAuthor.getStore().load({
						params: {
							action:2,
							job_code:job_code
						}
					});

					var gridAuthor=Ext.getCmp('contribgridCP');
					gridAuthor.getStore().load({
						params: {
							action:4,
							job_code:job_code
						}
					});

					var gridBudget=Ext.getCmp('budgetgridCP');
					gridBudget.getStore().load({
						params: {
							action:1,
							job_code:job_code
						}
					});

					var gridBudget=Ext.getCmp('schedulegridCP');
					gridBudget.getStore().load({
						params: {
							action:4,
							projectid:project_id
						}
					});

					var gridNotes=Ext.getCmp('notesgridCP');
					gridNotes.getStore().load({
						params: {
							action:3,
							project_id:project_id
						}
					});
					
						var gridNotes=Ext.getCmp('completeprojectArtworkgrid');
					gridNotes.getStore().load({
						params: {
							action:3,
							project_id:project_id
						}
					});
					
										
							var gridNotes=Ext.getCmp('completed_editaccountReceiveGrid_a');
					gridNotes.getStore().load({
						params: {
							action:13,
							job_code:job_code
						}
					});
					
					/*end*/
					
				}
			},]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
/*{
xtype : 'button',
id : 'archive',
text : 'Archive',
pressed:true,
x : 500,
y : 10,
width : 100,
height : 25,
handler : function() {

var selection = Ext.getCmp('publishergridCP').getSelectionModel().getSelection();
if(selection.length==0)
{
Ext.Msg.alert("Select atleast one");
}else
{
var length=selection.length;

}
var project_id='';
for (var i=0; i < selection.length; i++)
{
if((length-1)>=i)
{
project_id = project_id + selection[i].data.id+',';

}
}

var conn = new Ext.data.Connection();
conn.request({
url: 'service/emailTemplate.php',
method: 'POST',
params : {action:8,project_id:project_id},
success:function(response){
obj = Ext.JSON.decode(response.responseText);
Ext.Msg.alert('Archived successfully', obj.message);
Ext.getCmp('publishergridCP').getStore().reload();
Ext.getCmp('archivesgrid').getStore().reload();
//var grid3=Ext.getCmp('publishergridCP');
//grid3.getStore().load({params:{action:1}});
//Ext.getCmp('stagesgrid').getView().refresh();
},
failure:function(response){
obj = Ext.JSON.decode(response.responseText);
Ext.Msg.alert('saving Failed !', obj.message);
}
});


}
}*/],
		}),
		
		this.callParent(arguments);

	}
});


