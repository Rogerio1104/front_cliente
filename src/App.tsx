import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import api, { IDataRequest, IDataResponse } from './provider/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete"

function App() {
  const [clientes, setClientes] = useState<any>([]);
  
  const navigate = useNavigate();
  
  const colunas: GridColDef[] = [
    {
      field: "id",
      headerName:"ID"
    },
    {
      field: "nome",
      headerName:"Nome"
    },
    {
      field: "sobreNome",
      headerName:"Sobre Nome",
      width: 150
    },
    {
      field: "dataNascimento",
      headerName:"Data Nascimento",
      width: 150
    },
    {
      field: "email",
      headerName:"Email"
    },
    {
      field: "telefone",
      headerName:"Telefone",
      width: 150
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: (params) =><>
      <IconButton
      size='small'
      onClick={() =>{

      }}>
       <DeleteIcon color = "error"/> 
      </IconButton>
      </>
    }
  ]

  const carregarClientes = async() =>{
    const request: IDataRequest = {
      url: "/clientes/"
    }
    const response: IDataResponse = await api.get(request);
    if(response.statusCode === 200){
      setClientes(response.data)
    }
  }

  useEffect(() =>{
       carregarClientes();
  }, [])

  return (
   <div>
      <button onClick={()=> {
        carregarClientes()
      }}>
        Carregar
      </button>
      <Link to={"/criarCliente"}>Criar Cliente</Link>
      <div>
        <DataGrid
        rows={clientes}
        columns={colunas}
        pageSizeOptions={[5,10,15]}
        initialState={{
          pagination:{
            paginationModel:{
              pageSize: 5
            }
          }
        }}
        onRowDoubleClick={(param) =>{
          navigate(`/criarCliente/${param.id}`);
        }}
        />
      </div>
   </div>
  );
}

export default App;
