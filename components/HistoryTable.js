import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import injectionsites from './injectionsites';

export default class HistoryTable extends Component {
  organiseData() {
    const formattedData = this.props.history.map((injection) => {
<<<<<<< HEAD
      return [
        injection.time.format('MMMM Do YYYY, h:mm a'), 
        `${injection.site.side} ${injection.site.part} ${injection.site.quadrant}`];
=======
      return [injection.time.calendar(), `${injection.site.side} ${injection.site.part} ${injection.site.quadrant}`];
>>>>>>> fe5269e143a8310de101f7440298dead92efe05b
    })
    return formattedData.reverse()
  }

  render() {
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row
            data={["Date", "Site"]}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={this.organiseData()} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
