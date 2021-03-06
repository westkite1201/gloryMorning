import React, { useEffect, Fragment, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import UseStores from '../../Setting/UseStores';
import WisdomQuotesItem from './WisdomQuotesItem';
import TextField from '@material-ui/core/TextField';
import { Button, Switch } from '@material-ui/core';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import './WisdomQuotes.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '200px',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
}));

const WisdomQuotes = observer(() => {
  const { quotes } = UseStores();
  const classes = useStyles();

  const rootRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    quotes.getQuotes();
  }, []);

  useIntersectionObserver({
    root: rootRef.current,
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        quotes.getQuotes();
        //loadMoreImage();
      }
    },
  });

  //   let storeQuotesList = []
  //   if(_.isNil(quotes.quetesList)){
  //     storeQuotesList = quotes.quetesList
  //   }
  let quotesList = quotes.quotesList.map((item, key) => {
    return <WisdomQuotesItem item={item} quotes={quotes} key={key} />;
  });
  return (
    <Fragment>
      <div>
        roolingmode
        <div>
          <Switch
            checked={quotes.rollingQuotesMode}
            onChange={quotes.setQuetosMode}
            value="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
        <div>{quotes.rollingQuotesIntervalTime}</div>
        <Button
          varient="contained"
          color="primary"
          onClick={() => quotes.setQuetosRollingIntervel(true)}
        >
          up
        </Button>
        <Button
          varient="contained"
          color="primary"
          onClick={() => quotes.setQuetosRollingIntervel(false)}
        >
          down
        </Button>
        <Button
          varient="contained"
          color="primary"
          onClick={quotes.setQuotesSetting}
        >
          적용
        </Button>
        <div></div>
      </div>
      <div
        ref={rootRef}
        className="quetosWrapper"
        id="quetosWrapper"
        onScroll={quotes.quotosWrapperOnScroll}
      >
        {quotesList}

        <div ref={targetRef} />
      </div>
      <div className="inputWrapper">
        <div>명언을 추가 해주세요.</div>
        <div className={classes.form}>
          <TextField
            id="filled-multiline-flexible"
            label="Quotes"
            multiline
            scmargin="normal"
            value={quotes.quotesStr}
            onChange={quotes.handleQuotes}
          />
          <TextField
            id="filled-name"
            label="author"
            margin="normal"
            value={quotes.author}
            onChange={quotes.handleAuthor}
          />
          <Button
            varient="contained"
            color="primary"
            onClick={quotes.setWisdomQuotes}
          >
            upload
          </Button>
          <Button
            varient="contained"
            color="primary"
            onClick={quotes.quotosWrapperOnScroll}
          >
            getTheScrollPosQuotesWrapper
          </Button>
        </div>
      </div>
    </Fragment>
  );
});

export default WisdomQuotes;
