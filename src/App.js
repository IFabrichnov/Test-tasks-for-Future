import React, {useEffect, useState} from 'react';
import './App.css';
import TableMain from "./components/TableMain";
import PaginationMain from "./components/PaginationMain";
import CircularProgress from '@material-ui/core/CircularProgress';
import Filter from "./components/Filter";
import UserInfo from "./components/UserInfo";
import ModalWindow from "./components/ModalWindow";
import Button from "@material-ui/core/Button";
import _ from 'lodash';

function App() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchItem, setSearchItem] = useState(null);
  const [row, setRow] = useState(null);
  const [sort, setSort] = useState({
    sortDirection: 'asc',
    sortField: ''
  });
  const [newData, setNewData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [openNewInputs, setOpenNewInputs] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchItems().then(data => {
      setItems(data)
    }).finally(() => {
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  //получение данных с сервера
  const fetchItems = async () => {
    const response = await fetch("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
    const data = await response.json();

    return data
  };


  //фильтрация данных после изменения инпута
  const getFilteredData = () => {
    //если нет данных то пустой массив, если инпут пуст, то возвращаю данные
    if (items.length === 0) return [];
    if (!searchItem) return items;

    const search = searchItem.toLowerCase();

    //поиск веду по имени и фамилии
    const filteredData = items.filter(({firstName, lastName}) => {
      return (
        firstName.toLowerCase().includes(search) ||
        lastName.toLowerCase().includes(search)
      );
    });

    return filteredData;
  };

  //отрисовка 25 постов
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = getFilteredData().slice(indexOfFirstPost, indexOfLastPost);

  //хэндлер сортировки
  const sortClick = (sortField) => {
    const sortReverse = sort.sortDirection === 'asc' ? 'desc' : 'asc';

    //применение библиотеки lodash
    let sortedItems = _.orderBy(items, sortField, sortReverse);
    setItems(sortedItems);
    setSort(prevState => ({...prevState, sortDirection: sortReverse, sortField: sortField}))

    //поворот стрелки
    if (sortField === sort.sortField) {
      setSort(prevState => ({...prevState, sortField: ''}));
    }
  };

  //добавление данных из инпутов модального окна в состояние данных
  const submitInput = (e) => {
    e.preventDefault();

    let data = items;
    data.unshift({
      'id': newData.id,
      'firstName': newData.firstName,
      'lastName': newData.lastName,
      'email': newData.email,
      'phone': newData.phone
    });

    //меняю состояние данных с новым item`ом
    setItems(data);
    setNewData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  //изменение инпутов и состояния newData
  const changeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNewData(prevState => ({...prevState, [name]: value}))
  };

  //колонки для таблицы
  const columns = [{
    name: 'id',
    field: 'id'
  }, {
    name: 'firstName',
    field: 'firstName'
  }, {
    name: 'lastName',
    field: 'lastName'
  }, {
    name: 'email',
    field: 'email'
  }, {
    name: 'phone',
    field: 'phone'
  }];

  //если идет загрузка - показываю лоадер
  if (loading) return <div className='loader'><CircularProgress/></div>;

  return (
    <div className='main-container'>
      <Filter onSearch={(value) => setSearchItem(value)}/>

      <Button
        className='button-modal'
        onClick={() => setOpenNewInputs(!openNewInputs)}
        variant="outlined"
        color="primary"
      >
        Открыть
      </Button>
      {openNewInputs ? <ModalWindow submitInput={submitInput} changeInput={changeInput}/> : null}

      <TableMain columns={columns}
                 sort={sort}
                 items={currentItems}
                 sortClick={sortClick}
                 rowSelect={(value) => setRow(value)}/>

      <PaginationMain paginate={(event, value) => setCurrentPage(value)}
                      getPageCount={Math.ceil(getFilteredData().length / itemsPerPage)}
                      currentPage={currentPage}/>
      {
        //отрисовка информации о пользователе
        row && !loading ? <UserInfo item={row}/> : null
      }
    </div>
  )
}

export default App;
