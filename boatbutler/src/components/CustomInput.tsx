import React, {useEffect, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      // maxWidth: 345,
    },
    shoppingList: {
      marginRight: "2%",
      marginLeft: "2%",
      paddingBottom: "6%",
      marginTop: "10%",
    },
    defaultList: {
      border: "1px solid black",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    formControl: {
      margin: theme.spacing(5),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

interface CustomInputProps{
    labelText: string;
    id: string;
    type: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const CustomInput = (props: CustomInputProps) => {
    const {labelText, id, handleChange, type, value} = props;


    return (
        <FormControl fullWidth >
        {labelText && (
          <InputLabel
            htmlFor={id}
          >
            {labelText}
          </InputLabel>
        )}
      
        <Input
          value={value}
          id={id}
          onChange={handleChange}
        //   {...inputProps}
          type={type}
        />
      </FormControl>
    )
}


