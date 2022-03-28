import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ4MjQ4MywiZXhwIjoxOTU5MDU4NDgzfQ.V9SSC1FvWJR17CGrM-f0n2sukXtfZZ7bh5SMBfxfMfo';
const SUPABASE_URL_KEY = 'https://xpqxrcxclxqadubbnqpy.supabase.co';
const supabaseClient = createClient(SUPABASE_URL_KEY, SUPABASE_ANON_KEY);

function realTimeMessages(addMessage){
    return supabaseClient.from('messages').on('INSERT', (liveReply) => {
        //  console.log('alo')
        addMessage(liveReply.new); 
    })
    .subscribe(); 
}


export default function PaginaChat() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);
    

    //supabase
    React.useEffect(() =>{
        supabaseClient.from('messages').select('*').order('id', { ascending: false }).then(({ data }) =>{
            console.log('dados:', data);
            setMessageList(data);
        });

        realTimeMessages((newMessage) =>{
            // handleNewMessage(newMessage)
            setMessageList((currentListValue) =>{
                return [
                    newMessage,
                    ...currentListValue,
                ]
            });
        });
    }, []);


    // Sua lógica vai aqui
    function handleNewMessage(newMessage){ 
        const message = {
            // id: messageList.length + 1,
            from: usuarioLogado,
            text: newMessage,
        };

        supabaseClient.from('messages').insert([message])
        .then(({ data }) =>{
        //     console.log('criando msg: ', data)
        });
        
        setMessage('');
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                // backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://cdn.pixabay.com/photo/2019/03/28/10/19/sunset-4086848_960_720.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.primary[1000],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={messageList} /> 
                    {/* {messageList.map((currentMessage) =>{
                         return (
                             <li key={currentMessage.id}>
                                 {currentMessage.from}: {currentMessage.text}
                             </li>
                         )
                     })}  */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) =>{
                                const valor = event.target.value;
                                setMessage(valor);
                            }}
                            onKeyPress={(event) =>{
                                if(event.key === 'Enter'){
                                    event.preventDefault();
                                    handleNewMessage(message)
                                }
                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.primary[1001],
                                marginRight: '12px',
                                color: 'white',
                            }}
                        />
                        <ButtonSendSticker 
                            onStickerClick={(sticker) =>{
                                // console.log('salvar essa poha')
                                handleNewMessage(`:sticker: ${sticker}`)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text styleSheet={{color: 'black'}} variant='heading5'>
                    Chat
                </Text>
                <Button
                    styleSheet={{
                        color:'black',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        hover: {
                            backgroundColor: appConfig.theme.colors.primary[1001],
                            color: 'white',
                        }
                    }}
                    // variant='tertiary'
                    // colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props.messageList);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowX: "hidden",
                // overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((message) =>{
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                            >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: '#303030',
                                    fontWeight: '600',
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* Condicional: {message.text.startsWith(':sticker:').toString()} */}
                        {message.text.startsWith(':sticker:') 
                        ? (
                            <Image src={message.text.replace(':sticker:', '')} />
                        )
                        : (
                            message.text    
                        )}
                        {/* {message.text} */}
                    </Text>
                );
            })}
        </Box>
    )
}