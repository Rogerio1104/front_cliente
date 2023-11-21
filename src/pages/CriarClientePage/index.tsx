import TextField from "@mui/material/TextField/TextField";
import "./index.css"
import { useEffect, useState } from "react";
import Button from "@mui/material/Button/Button";
import api, { IDataRequest, IDataResponse } from "../../provider/api";
import { useNavigate, useParams } from "react-router-dom";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

const CriarClientePage = () => {
    const { id } = useParams();
    const [nome, setNome] = useState<string>("");
    const [sobreNome, setSobreNome] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");

    const navigate = useNavigate();

    const enviarCliente = async () => {
        const request: IDataRequest = {
            url: "/clientes/",
            data: {
                nome: nome,
                sobreNome: sobreNome,
                dataNascimento: dataNascimento,
                email: email,
                telefone: telefone,
            }
        }

        if (id) {
            request.url = `/clientes/${id}`;
            const response: IDataResponse = await api.put(request);
            if (response.statusCode === 200) {
                alert("Registro atualizado com sucesso!");
                navigate("/");
            }

            return;
        }

        const response: IDataResponse = await api.post(request);
        if (response.statusCode === 201) {
            alert("Registro criado com sucesso!")
            navigate("/");
        }
    }

    const buscarCliente = async () => {
        const request: IDataRequest = {
            url: `/clientes/${id}`,
        }

        const response: IDataResponse = await api.get(request);
        if (response.statusCode === 200) {
            const data = response.data;

            setNome(data.nome);
            setSobreNome(data.sobreNome);
            setDataNascimento(data.dataNascimento);
            setEmail(data.email);
            setTelefone(data.telefone);
        }
    }

    useEffect(() => {
        if (id) {
            buscarCliente();
        }
    }, [])
    return <>
        <div className="body">
            <div className="box">
                {id ? <>
                    <div className="box-input">
                        <TextField
                            variant="outlined"
                            label="ID"
                            fullWidth
                            value={id}
                            disabled={true} />
                    </div>
                </> : ""}
                <div className="box-input">
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        value={nome}
                        onChange={(t) => {
                            setNome(t.target.value);
                        }}
                    />
                </div>
                <div className="box-input">
                    <TextField
                        label="SobreNome"
                        variant="outlined"
                        fullWidth
                        value={sobreNome}
                        onChange={(t) => {
                            setSobreNome(t.target.value);
                        }}
                    />
                </div>
                <div className="box-input">
                    <TextField
                        label="Data Nascimento"
                        variant="outlined"
                        fullWidth
                        value={dataNascimento}
                        onChange={(t) => {
                            setDataNascimento(t.target.value);
                        }} />
                </div>
                <div className="box-input">
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(t) => {
                            setEmail(t.target.value);
                        }} />
                </div>
                <div className="box-input">
                    <TextField
                        label="Telefone"
                        variant="outlined"
                        fullWidth
                        value={telefone}
                        onChange={(t) => {
                            setTelefone(t.target.value);
                        }} />
                </div>
                <div className="box-input">
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            enviarCliente();
                        }}>
                        Enviar Cliente</Button>
                </div>
            </div>
        </div>
    </>
}

export default CriarClientePage;