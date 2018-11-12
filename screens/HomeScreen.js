import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Switch, Text, Image } from 'react-native';
import moment from 'moment';
import CurrentSite from '../components/CurrentSite';
import PreviousSite from '../components/PreviousSite';
import Header from '../components/Header';
import ConfirmModal from '../components/ConfirmModal';
import injectionsites from '../components/injectionsites';
import BodyImages from '../components/BodyImages';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';
import { connect } from 'react-redux'
import { saveInj, resetHistory } from '../redux/actions/history';
import { nextInjSite, resetSites, rotateNSites } from '../redux/actions/sites';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shortMed: true
    }
  }

  static navigationOptions = {
    title: 'Injection Dependent'
  };

  nextSite() {
    this.props.nextInjSite();
  }

  handleConfirmation() {
    this.props.saveInj({
      site: this.props.sites[0],
      time: Date.now(),
      dbsync: false,
      medType: (this.state.shortMed ? 'Short' : 'Long')
    });
    this.nextSite();
  }

  handleSkip() {
    let self = this
    let i
    let skippedPart = self.props.sites[0].part
    let skippedSide = self.props.sites[0].side
    for(i = 0; i < self.props.sites.length; i++) {
      if (
        self.props.sites[i].part != skippedPart || self.props.sites[i].side != skippedSide
      ) {
        self.props.rotateNSites(i)
        break
      }
    }
  }

  skipUntilActive() {
    let self = this
    let i
    for(i = 0; i < self.props.sites.length; i++) {
      if (self.props.sites[i].active === true ) {
        if (i != 0) { self.props.rotateNSites(i) }
        return self.props.sites[i]
      }
    }
  }

  previousSite() {
    if (this.props.history.length !== 0) {
      return <PreviousSite
        id='previousSite'
        site={this.props.history[this.props.history.length - 1].site}
        time={this.props.history[this.props.history.length - 1].time}
      />
    } else {
      // return <Text>No saved sites yet</Text>
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.05,
      directionalOffsetThreshold: 200
    };
    return (
      <View style={styles.container}>
        <View>
          {/* <Header /> */}
          {this.previousSite()}
          <GestureRecognizer
            onSwipeLeft={ () => this.handleSkip() }
            onSwipeRight={ () => this.handleSkip() }
            config={config}
          >
            <BodyImages imgNum={this.props.sites[0].imgNum} />
          </GestureRecognizer>
          <CurrentSite
            id="currentSite"
            site={this.skipUntilActive()}
          />
          <ConfirmModal
            site={this.props.sites[0]}
            onConfirmation={() => this.handleConfirmation()}
          />
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <Text>Long -- Short</Text>
            <Switch value={this.state.shortMed} onValueChange={(value) => (this.setState({ shortMed: value })) } />
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3C5CA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  image: {
    width: 110,
    height: 200,
    padding: 10,
    alignSelf: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    sites: state.sites,
    history: state.history
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveInj: (inj) => { dispatch(saveInj(inj)); },
        nextInjSite: () => { dispatch(nextInjSite()); },
        rotateNSites: (n) => { dispatch(rotateNSites(n)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
