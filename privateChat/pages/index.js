import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';


function Title(props) {
  return (
    <>
      <h1>{props.children}</h1>

      <style jsx>{`
        h1{
          color: ${appConfig.theme.colors.primary["050"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}


// //Isso é um componente React!
// function HomePage() {
//   //Isso é um JSX!
//     return (
//       <div>
//         <GlobalStyle />
//         <Title>Seja Bem Vindo</Title>
//         <h2>PrivChat</h2>
//       </div>
//     ) 
//   }
  
//   export default HomePage

export default function PaginaInicial() {
  // const username = 'oliverlucass';
  const [username, setUsername] = React.useState('oliverlucass');
  const roteamento = useRouter();
  

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          // backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2019/03/28/10/19/sunset-4086848_960_720.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '10px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[1000],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosEvent){
              infosEvent.preventDefault();
              roteamento.push(`/chat?username=${username}`);
              // window.location.href='/chat'
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Seja bem vindo!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input 
              type='text'
              value={username}          
              onChange={function (event){
                console.log('usuario digitou', event.target.value)
                //Onde ta o valor?
                const valor = event.target.value;
                //Trocar o valor da var
                setUsername(valor); 
              }}  
            /> */}

            <TextField
              value={username}
              onChange={function (event){
                console.log('usuario digitou:', event.target.value)
                //onde ta o valor?
                const valor = event.target.value;
                //trocar o valor da var
                setUsername(valor);
              }}
              placeholder="Como você gostaria de ser chamado?"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.primary[1000],
                  mainColorHighlight: appConfig.theme.colors.primary['050'],
                  backgroundColor: appConfig.theme.colors.primary[1001],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[1000],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[1001],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[700],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary[1001],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['000'],
                backgroundColor: appConfig.theme.colors.primary[1000],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}