
module.exports = {
    name:'trex',
    description:'Play trex animation',
    type:'CHAT_INPUT',
    async execute(interaction){
        try {
            let msg = await interaction.editReply({ content: `---------------🦖` })
            let time = 1 * 1000

            setTimeout(function () {
                interaction.editReply(`-----------🦖----`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`----------🦖------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`--------🦖--------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`------🦖-----------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`-------🦖-----------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`---🌵-----🦖---------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`---🌵-🦖-------------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`🦖\n ---🌵--------------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`------🦖---🌵--------------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`----🦖-----🌵----------------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`-🌵🌵-----🦖-------🌵--------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`----🌵🌵-🦖----------🌵------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`🦖\n ---🌵🌵-------------🌵---`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`-----🦖---🌵🌵-------------🌵--`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`-------🦖-----🌵🌵-------------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`🎂----🦖--------🌵🌵-----------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`---🎂--🦖----------🌵🌵---------`).catch(x => x.return);
            }, time)
            time += 1.5 * 1000

            setTimeout(function () {
                interaction.editReply(`**:regional_indicator_m::regional_indicator_i::regional_indicator_s::regional_indicator_s::regional_indicator_i::regional_indicator_o::regional_indicator_n:    :regional_indicator_c::regional_indicator_o::regional_indicator_m::regional_indicator_p::regional_indicator_l::regional_indicator_e::regional_indicator_t::regional_indicator_e::regional_indicator_d: !**\n ---🎂🦖----------🌵🌵-------------`).catch(x => x.return);
            }, time)

        } catch {
            return;
        }
   }
}