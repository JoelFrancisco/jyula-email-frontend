import { useState } from "react";
import MonacoEditor from "../components/templatesComponents/MonacoEditor";
import { Box, Typography, TextField, InputAdornment, Button, Snackbar } from "@mui/material";
import ExampleTemplate from "../components/templatesComponents/ExampleTemplate";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";

function CreateTemplates() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState(ExampleTemplate());
  const [apiError, setApiError] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const handleSaveTemplate = async () => {
    // Verificar se todos os campos têm conteúdo
    if (!subject.trim() || !name.trim() || !content.trim()) {
      setEmptyFieldsError(true);
      setApiError(false);
      setSuccess(false);
      navigate("/app/selecionar-template");
      return;
    }

    try {
      const response = await axios.post("/api/v1/templates", {
        name,
        subject,
        content,
      });

      // Aqui, após o sucesso da API, definimos o estado de sucesso como true
      setSuccess(true);
      setEmptyFieldsError(false);
      setApiError(false);

      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao salvar template:", error);
      setApiError(true);
      setEmptyFieldsError(false);
      setSuccess(false);
    }
  };

  const handleAlertClose = () => {
    setEmptyFieldsError(false);
    setApiError(false);
    setSuccess(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <TextField
          sx={{ width: "100%", height: "30px" }}
          variant="standard"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: "#2D3C42", fontWeight: "bold" }}>Nome do template:</Typography>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ width: "100%", height: "30px", margin: "5px 0px 10px 0px" }}
          variant="standard"
          size="small"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: "#2D3C42", fontWeight: "bold" }}>Assunto:</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <MonacoEditor content={content} onContentChange={setContent} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
          width: "100%",
        }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2D3C42",
            "&:hover": {
              backgroundColor: "#1D2C34",
            },
            textTransform: "capitalize",
            width: "150px",
          }}
          onClick={handleSaveTemplate}>
          <Typography variant="body2">Salvar template</Typography>
        </Button>
        <Snackbar
          open={emptyFieldsError || apiError || success}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert
            variant="filled"
            onClose={handleAlertClose}
            severity={emptyFieldsError ? "warning" : apiError ? "error" : "success"}>
            {emptyFieldsError
              ? "Preencha todos os campos antes de salvar"
              : apiError
                ? "Erro ao salvar, tente novamente mais tarde"
                : "Template salvo com sucesso!"}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default CreateTemplates;
