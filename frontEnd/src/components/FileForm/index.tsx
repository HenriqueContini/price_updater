import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import * as S from "./styles";
import React, { Dispatch, SetStateAction } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

interface FileFormProps {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  checkData: () => Promise<void>;
}

export default function FileForm({ file, setFile, checkData }: FileFormProps) {
  const theme = useTheme();

  const handleAddFile = (fileList: FileList | null) => {
    if (fileList) {
      setFile(fileList[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(undefined);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkData();
  };

  return (
    <Container sx={{ marginTop: "40px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: "16px",
          borderColor: theme.palette.divider,
          borderWidth: "1px",
          borderStyle: "solid",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          maxWidth: "400px",
          marginInline: "auto",
        }}
      >
        <Typography variant="h5" component="h2" align="center">
          Adicione um arquivo
        </Typography>

        <Button
          component="label"
          variant="outlined"
          startIcon={<FileUploadOutlinedIcon />}
          href="#file-upload"
        >
          Upload
          <S.FormInput
            type="file"
            name="csvFile"
            accept="text/csv"
            id="#file-upload"
            onChange={(e) => handleAddFile(e.target.files)}
          />
        </Button>

        {file && (
          <>
            <Chip
              label={file.name}
              variant="outlined"
              onDelete={handleRemoveFile}
            />

            <Button
              component="button"
              type="submit"
              variant="contained"
              startIcon={<CheckCircleOutlinedIcon />}
              sx={{ backgroundColor: theme.palette.primary.dark }}
            >
              Validar
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
