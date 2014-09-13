 Ext.define('MyDesktop.model.Projects', {
        extend: 'Ext.data.Model',
        fields: [
            
             'id','code','title','author','hbisbn','pbisbn','series','format','design','deadline','client','client_team','workflow','word_count'        
        ],
       idProperty: 'id'
    });