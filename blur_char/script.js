/*
ก ข ฃ ค ฅ ฆ ง จ ฉ ช
ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด
ต ถ ท ธ น บ ป ผ ฝ พ
ฟ ภ ม ย ร l l l l l
l l l l l ฤ l l l l
l l l l l l ล l l l
l l l l l l l ฦ l l
l l l l l l l l ว ศ
ษ ส ห ฬ อ ฮ l l l l
l l l l l l ฯ l l l
l l l l l l l ะ อั า
อำอิ อี อึ อื อุ อู อฺ X X
X X ฿ เ แ โ ใ ไ ฤๅๆ
อ็ อ่ อ้ อ๊ อ๋ อ์ อํ ? ? ๐
๑ ๒ ๓ ๔ ๕ ๖ ๗ ๘ ๙ ?
?
*/

function array_encode(character_input) {
  let encoder_instance = new TextEncoder()
  const array_source = Array.from(
    encoder_instance.encode(
      character_input))
  return array_source
}

function direct_subtract_array(ini_input, fin_input) {
  const ini = ini_input.substring(ini_input.length - 1)
  const fin = fin_input.substring(fin_input.length - 1)
  const ini_encoded_array = array_encode(ini)
  const fin_encoded_array = array_encode(fin)
  let highest_length = ini_encoded_array.length
  if (ini_encoded_array.length < fin_encoded_array.length) {
    highest_length = fin_encoded_array.length
  }
  let total_subtraction_result = 0
  for (let i = (highest_length - 1); i >= 0; i--) {
    var element_ini = 0
    var element_fin = 0
    if (ini_encoded_array.length - (i + 1) >= 0) {
      element_ini = ini_encoded_array[
        ini_encoded_array.length - (i + 1)
      ]
    }
    if (fin_encoded_array.length - (i + 1) >= 0) {
      element_fin = fin_encoded_array[
        fin_encoded_array.length - (i + 1)
      ]
    }
    total_subtraction_result += (
      (element_fin - element_ini) *
      Math.pow(256, i))
  }
  return total_subtraction_result
}

function subtract_array_size(ini_input, fin_input) {
  const ini = ini_input.substring(ini_input.length - 1)
  const fin = fin_input.substring(fin_input.length - 1)
  const ini_encoded_array = array_encode(ini)
  const fin_encoded_array = array_encode(fin)
  return (
    fin_encoded_array.length -
    ini_encoded_array.length)
}

function append_character_inclusion(ref_input, target_input) {
  // condition_ranges
  let output_string = ''
  console.log(output_string)
  let added_base_char = ''
  for (let i = 0; i < ref_input.length; i++) {
    const element_arr = ref_input[i].split('-')
    const element_ini = element_arr[0]
    const element_fin = element_arr[element_arr.length - 1]
    const ini_diff = direct_subtract_array(target_input, element_ini)
    const fin_diff = direct_subtract_array(target_input, element_fin)
    if (ini_diff <= 0 && fin_diff >= 0) {
      added_base_char += element_ini.substring(0, 1)
    }
  }
  added_base_char += target_input
  output_string += added_base_char
  return output_string
}

function increment_encoded_array(src_array) {
  let flipped_increment_array = []
  let carry = 1
  for (let i = 0; i < src_array.length; i++) {
    var tally_variable = src_array.length - (i + 1)
    const element = src_array[tally_variable]
    if (element + carry < 256) {
      flipped_increment_array.push(element + carry)
      carry = 0
    }
    else if (element + carry == 256) {
      flipped_increment_array.push(0)
      carry = 1
    }
  }
  if (carry > 0) {
    flipped_increment_array.push(carry)
  }
  let feed_increment_array = []
  for (let i = 0; i < flipped_increment_array.length; i++) {
    feed_increment_array.push(flipped_increment_array[
      flipped_increment_array.length - (i + 1)])
  }
  return feed_increment_array
}

function main() {
  let output_string = ''
  // - ' ' - '~'
  // - 'ก' - 'อฺ'
  // - '฿'
  // - 'เ' - 'อํ'
  // - '๐' - '๙'
  //
  // - 'อั'
  // - 'อำ' - 'อฺ'
  // - 'ฤๅ'
  // - 'อ็' - 'อํ'
  const character_ranges = [
    ' -~',
    'ก-อฺ',
    '฿',
    'เ-อํ',
    '๐-๙',
  ]
  const condition_ranges = [
    'อั',
    'อำ-อฺ',
    'ฤๅ',
    'อ็-อํ'
  ]
  for (let i = 0; i < character_ranges.length; i++) {
    const element_arr = character_ranges[i].split('-')
    const element_ini = element_arr[0]
    const element_fin = element_arr[element_arr.length - 1]
    const character_range_size = direct_subtract_array(
        element_ini,
        element_fin) + 1
    var loop_row_size = character_range_size
    loop_row_size = Math.ceil(loop_row_size / 10)
    let current_character = element_ini
    for (let j = 0; j < loop_row_size; j++) {
      var loop_column_size = 10
      if ((j + 1) == loop_row_size) {
        if (character_range_size % 10 != 0) {
          loop_column_size = character_range_size % 10
        }
        else if (character_range_size % 10 == 0) {
          loop_column_size = 10
        }
      }
      for (let i_ = 0; i_ < loop_column_size; i_++) {
        /*
          output_string += ('' +
            '<div id="focused_column">\n' +
            '  <div id="content_column">' +
            append_character_inclusion(
              condition_ranges, current_character) +
            '</div>\n' +
            '  <div id="bottom_column"></div>\n' +
            '</div>\n'
          )
        */
        output_string += ('' +
          '\'' +
          append_character_inclusion(
            condition_ranges, current_character)
            .replace(/\\/g, '\\\\')
            .replace(/\'/g, '\\\'') +
          '\'\n'
        )
        let decoder_instance = new TextDecoder()
        current_character = decoder_instance.decode(
          Uint8Array.from(
            increment_encoded_array(
              array_encode(current_character)
            )
          )
        )
      }
    }
  }
  return output_string
}

// console.log(main())
document.getElementById('script_output').innerHTML = main()