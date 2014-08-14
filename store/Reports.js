Ext.define('MyDesktop.store.Reports', {
       extend:'Ext.data.Store',
               pageSize: 8,
       model: 'MyDesktop.model.Customers_team',
       proxy: {
                   type:'ajax',
                       url: 'service/Reports.php',
                       actionMethods: {
                    read: 'POST'
                   },
                           extraParams:{action:2},
                   reader: {
                               type:'json',
                       root: 'results',
                       totalProperty: 'total'
                   }
               },
   });