import PlayArrow from '@mui/icons-material/PlayArrow';
import Sliders from 'react-slick';
import Pause from '@mui/icons-material/Pause';
import CloudUpload from '@mui/icons-material/CloudUpload';
import MusicNote from '@mui/icons-material/MusicNote';
import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Container,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Slider,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Fade,
  Collapse,
} from '@mui/material';
import {
  SkipNext,
  SkipPrevious,
  VolumeUp,
  Search
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import ImageIcon from '@mui/icons-material/Image';
import cardCameraBackIcon from '@mui/icons-material/cardCameraBack';

import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { type BreadcrumbItem, type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import AttachFileIcon from '@mui/icons-material/AttachFile';
<<<<<<< HEAD
import CopyLinkButton from './Buttons';
=======
import CopyLinkButton from './Buttons'; 
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePage } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
<<<<<<< HEAD
  {
    title: 'Главная',
    href: '/settings/profile',
  },
=======
    {
        title: 'Главная',
        href: '/settings/profile',
    },
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
];
interface Comment {
  id: number;
  user: {
    name: string;
    photo?: string;
  };
  body: string;
  created_at: string;
}

// Кастомная тема
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
    },
    secondary: {
      main: '#191414',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

interface Song {
  id: number;
  title: string;
  author: string;
<<<<<<< HEAD
  authorphoto: string;
=======
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
  url: string;
  duration: number;
  imgurl?: string;
  videourl?: string;
  audiourl?: string;
  created_at: string;
  comments: Comment[];
}

interface MusicProps {
  card: Song;
}

<<<<<<< HEAD
const Music: React.FC<MusicProps> = ({ card, comments, recentCards,randomCards,count,like,subscriber,subscribercount }) => {
  const getInitials = useInitials();
   const [subscribed, setSubscribed] = useState(subscriber);
  const [subscribersCount, setSubscribersCount] = useState(subscribercount);

  const [checked, setChecked] = useState(like);
  const { auth } = usePage<SharedData>().props;
=======
const Music: React.FC<MusicProps> = ({ card,comments  }) => {
  const getInitials = useInitials();
   const { auth } = usePage<SharedData>().props;
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const handleAudioFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };
  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    let number = 0;
    files.forEach((file, index) => {
<<<<<<< HEAD
      formData.append(`files[${index}]`, file); // или просто `files[]`
      number += 1;
    });
    formData.append('count', number);
=======
        formData.append(`files[${index}]`, file); // или просто `files[]`
        number+=1;
      });
      formData.append('count', number);
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
    try {
      await Inertia.post(route('dashboard.post'), formData);
      setTitle('');
      setAuthor('');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (errors) {
      console.error('Upload error:', errors);
    }
  };
<<<<<<< HEAD
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div

      />
    );
  }
  const handleFollowToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const path = window.location.pathname; // '/cards/2'
  const cardId = path.split('/')[2];     // '2'
  await Inertia.post(`/cards/${cardId}/like`);
  };

  const handleFollowToggle2 = async (cardId: string) => {
  await Inertia.post(`/cards/${cardId}/like`);
};

const handleFollowToggle3 = async (targetUserId: string) => {
  await Inertia.post(`/subscriptions/toggle/${targetUserId}`);
}; 

  const settings = {
    dots: false, // показывать точки для переключения слайдов
=======

  const settings = {
    dots: true, // показывать точки для переключения слайдов
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
    infinite: true, // бесконечный цикл слайдов
    speed: 500, // скорость переключения
    slidesToShow: 1, // количество слайдов, показываемых одновременно
    slidesToScroll: 1, // количество слайдов для прокрутки
<<<<<<< HEAD
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const { data, setData, reset, post } = useForm({
    card_id: card.id,
    body: '',
  });

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('Ссылка скопирована!');
      })
      .catch((err) => {
        console.error('Ошибка при копировании: ', err);
      });
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>

          {/* Список треков */}
          <TransitionGroup>
            <Card sx={{ maxWidth: 1000, marginBottom: "20px", borderRadius: "15px" }}>


              <CardContent>
                <div class="w-[100%]">

                  {card.imgurl && card.imgurl.split(',').length > 1 && <Sliders {...settings} class="h-128 w-128 bg object-contain">
                    {card.imgurl && card.imgurl.split(',').map((url, index) => (
                      <CardMedia
                        class="h-128 w-128 bg object-contain bg-black"
                        component="img"
                        image={url}
                      />
                    ))}

                  </Sliders>}

                  {card.imgurl && card.imgurl.split(',').length == 1 && <CardMedia
                    class="h-128 w-full bg object-contain bg-black"
                    component="img"
                    image={card.imgurl}
                    sx={{ width: "100%" }}
                  />}
                  {card.videourl && card.videourl.split(',').length > 1 && <Sliders {...settings} >
                    {card.videourl && card.videourl.split(',').map((url, index) => (
                      <CardMedia
                        class="h-128 w-128 bg object-contain bg-black"
=======
};

const { data, setData, reset, post } = useForm({
  card_id: card.id,
  body: '',
});

const handleCopyLink = (url: string) => {
  navigator.clipboard.writeText(url)
    .then(() => {
      console.log('Ссылка скопирована!');
    })
    .catch((err) => {
      console.error('Ошибка при копировании: ', err);
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

        <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh' }}>

        {/* Список треков */}
        <TransitionGroup>
            <Card sx={{ maxWidth: 1000, marginBottom:"20px", borderRadius: "15px"}}>
            <CardHeader
              avatar={
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
        
                <AvatarImage src={"http://127.0.0.1:8001/" + auth.user.photo} alt={auth.user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(auth.user.name)}
                </AvatarFallback>
              </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={card.author}
            />

            <CardContent>
              <div class="w-[90%] m-auto">
              <div class=" pb-4"><Typography variant="body" sx={{ color: 'text.secondary' }}>
                {card.title}
            </Typography></div>
            {card.imgurl &&  card.imgurl.split(',').length > 1 && <Sliders {...settings} class = "h-128 w-128 bg object-contain">
                {card.imgurl && card.imgurl.split(',').map((url, index) => (
                    <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        component="img"
                        image={url}
                        alt={`image-${index}`}
                    />
                ))}

            </Sliders>}
            
            {card.imgurl &&  card.imgurl.split(',').length == 1 &&  <CardMedia
                    class = "h-128 w-128 bg object-contain bg-black"
                    component="img"
                    image={card.imgurl}
                    sx={{width: "100%"}}
                />}
            {card.videourl && card.videourl.split(',').length > 1 && <Sliders {...settings} >
                {card.videourl && card.videourl.split(',').map((url, index) => (
                    <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
                        component="card"
                        image={url}
                        controls
                        alt={`image-${index}`}
<<<<<<< HEAD
                        sx={{ marginTop: "10px", width: "100%" }}
                      />
                    ))}
                  </Sliders>}
                  {card.videourl && card.videourl.split(',').length == 1 && <CardMedia
                    class="h-128 w-full bg object-contain bg-black"
                    component="card"
                    image={card.videourl}
                    controls
                    sx={{ marginTop: "10px" }}
                  />}
                  {card.audiourl && card.audiourl.split(',').map((url, index) => (
                    <CardMedia
                      component="audio"
                      image={url}
                      controls
                      sx={{ marginTop: "10px" }}
                    />
                  ))}
                </div>
                <div className='flex items-center'>
                  <Typography variant="body" sx={{ color: 'text.secondary' }}>
                    {new Date(card.created_at).toLocaleString()}
                  </Typography>
                  <div className='ml-auto'></div>
                      { auth.user && <Checkbox
                        checked={checked}
                        onChange={handleFollowToggle}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                      />}
                  <Typography variant="body" sx={{ color: 'text.secondary' }}>
                    {count}
                  </Typography>
                  <CopyLinkButton link={"http://127.0.0.1:8001/dashboard/" + card.id} />
                </div>
                <div><Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  {card.title}
                </Typography></div>
              </CardContent>
              <CardHeader

                title={
                  <div>
                    <div class="flex">
                    <a href={"/profile/"+ card.user.id} class="flex">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage src={"http://127.0.0.1:8001/" + card.user.photo} alt={card.user.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(card.user.name)}
                    </AvatarFallback>
                  </Avatar>
                      <p class="ml-5">{card.user.name}</p>
                     </a>
                          { auth.user && <Button
                            type="button"
                            variant="contained"
                            sx={{ marginLeft: "20px", color: "white", fontWeight: "600" }}
                            onClick={async () => await handleFollowToggle3(card.user.id)}
                          >
                            {subscribed ? "Unfollow" : "Follow"} ({subscribersCount})
                          </Button>}
                    </div>
                    <div class="flex">
                      {recentCards.map((video) => (
                        <Card
                          sx={{
                            marginTop:"20px",
                            marginRight:"10px",
                            borderRadius: '15px',
                            width: '150px',
                            height: '150px',
                            transition: 'opacity 0.3s',
                            '&:hover': {
                              opacity: 0.8,
                            },
                          }}
                          className="bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${video.imgurl.split(',')[0]})` }}
                        >
                          <CardContent className=" h-25">
                            <a href={'http://127.0.0.1:8001/dashboard/' + video.id}>
                              <div className="h-full"></div>
                            </a>
                          </CardContent>
                          <CardActions disableSpacing>
                            { auth.user &&<Checkbox checked={video.liked} onChange={async () => await handleFollowToggle3(video.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                            {video.title}
                          </CardActions>
                        </Card>
                      ))}</div>
                  </div>}
              />
              <CardActions disableSpacing>

              </CardActions>
            </Card>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Комментарии</Typography>
              
              { auth.user &&<form onSubmit={(e) => {
=======
                        sx={{marginTop: "10px", width: "100%"}}
                    />
                ))}
            </Sliders>}
            {card.videourl && card.videourl.split(',').length == 1 && <CardMedia
                        class = "h-128 w-128 bg object-contain bg-black"
                        component="card"
                        image={card.videourl}
                        controls
                        sx={{marginTop: "10px"}}
                    />}
            {card.audiourl && card.audiourl.split(',').map((url, index) => (
                <CardMedia
                    component="audio"
                    image={url}
                    controls
                    sx={{marginTop: "10px"}}
                />
            ))}
              </div>
 
            </CardContent>
            <CardActions disableSpacing>
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>
              <CopyLinkButton link={"http://127.0.0.1:8001/dashboard/"+ card.id} />
              <div className='ml-auto'></div>{new Date(card.created_at).toLocaleString()}
            </CardActions>
              </Card>
              <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Комментарии</Typography>

              <form onSubmit={(e) => {
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
                e.preventDefault();
                post(route('comments.store'), {
                  onSuccess: () => reset('body')
                });
              }}>
<<<<<<< HEAD
                <Box className="flex mt-3">
                  <Avatar className="h-11 w-11 overflow-hidden rounded-full  mr-2.5 mt-2">
                    <AvatarImage src={"http://127.0.0.1:8001/" + auth.user.photo} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <TextField
                    fullWidth
                    multiline
                    rows={1}
                    variant="outlined"
                    placeholder="Оставить комментарий..."
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    className='h-16'
                  />
                  <Button type="submit" variant="contained" sx={{ marginLeft: "10px" }} className='h-13 mt-5'>Отправить</Button>
                </Box>
                <input type="hidden" name="song_id" value={card.id} />
              </form>}

              <List>
                {comments.map((comment) => (
                  <ListItem key={comment.id} sx={{ justifyContent: "flex-start", padding: "0" }}>
                    <Avatar className="h-11 w-11 overflow-hidden rounded-full  mr-2.5 mt-2">
                      <AvatarImage src={"http://127.0.0.1:8001/" + comment.user.photo} />
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(comment.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <ListItemText
                      primary={`${comment.user.name} • ${new Date(comment.created_at).toLocaleString()}`}
                      secondary={comment.body}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </TransitionGroup>
        </Container>

        <Container maxWidth="md" sx={{ py: 4}}>
        <Typography variant="h4" gutterBottom>Похожие Работы</Typography>
        <div className="flex">
                      {randomCards.map((video) => (
                        <Card
                          sx={{
                            marginTop:"20px",
                            marginRight:"10px",
                            borderRadius: '15px',
                            width: '150px',
                            height: '150px',
                            transition: 'opacity 0.3s',
                            '&:hover': {
                              opacity: 0.8,
                            },
                          }}
                          className="bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${video.imgurl.split(',')[0]})` }}
                        >
                          <CardContent className=" h-25">
                            <a href={'http://127.0.0.1:8001/dashboard/' + video.id}>
                              <div className="h-full"></div>
                            </a>
                          </CardContent>
                          <CardActions disableSpacing>
                            <Checkbox checked={video.liked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            {video.title}
                          </CardActions>
                        </Card>
                      ))}</div>
        </Container>

        
        
      </ThemeProvider>
=======
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Оставить комментарий..."
                  value={data.body}
                  onChange={(e) => setData('body', e.target.value)}
                />
                 <input type="hidden" name="song_id" value={card.id} />
                <Button type="submit" variant="contained" sx={{ mt: 1 }}>Отправить</Button>
              </form>

              <List>
              {comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start ">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full  mr-2">
        
                      <AvatarImage src={"http://127.0.0.1:8001/" + comment.user.photo} alt={comment.user.name}/>
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                          {getInitials(auth.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  <ListItemText
                    primary={`${comment.user.name} • ${new Date(comment.created_at).toLocaleString()}`}
                    secondary={comment.body}
                  />
                </ListItem>
              ))}
              </List>
            </Box>
        </TransitionGroup>
      </Container>
    </ThemeProvider>
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
    </AppLayout>
  );
};

export default Music;
