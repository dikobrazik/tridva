'use client';

import {Box} from '@/components/layout/Box';
import {Column} from '@/components/layout/Column';
import {Row} from '@/components/layout/Row';
import css from './InformationRow.module.scss';
import {Text} from '@/components/Text';
import PopUp from '../PopUp';
import {useState} from 'react';
import {Modal} from '@/components/Modal';
import Image from 'next/image';

import first from './images/1.jpeg';
import second from './images/2.png';
import third from './images/3.png';
import fourth from './images/4.png';
import fithe from './images/5.png';

const InformationList = [
    {
        titleTag: 'h1' as const,
        image: first,
        title: (
            <>
                Cовместные покупки в{' '}
                <Text weight={500} color="#F40C43">
                    Tridva shop
                </Text>
            </>
        ),
        description: `Принцип организации покупки, который появился в середине 2000-х годов на стыке новых возможностей
    интернет-коммуникаций по удалению избыточных посредников и неформальной системы местных
    потребительских связей определённого города и региона. При совершении совместной покупки несколько
    лиц приобретают товары непосредственно у поставщика или производителя по оптовым ценам, независимо
    от страны его расположения. Такая покупка делается организатором нередко через интернет-магазин или
    онлайн-аукцион.`,
    },
    {
        title: 'Доставка',
        image: second,
        description: '',
    },
    {
        title: 'Помощь',
        image: third,
        description: '',
    },
    {
        title: 'Получи бесплатно',
        image: fourth,
        description: '',
    },
    {
        title: 'Выгодные товары дня',
        image: fithe,
        description: '',
    },
];

export default function InformationRow() {
    const [selectedInformationIndex, setSelectedInformationIndex] = useState<number>();
    const selectedInformation =
        selectedInformationIndex !== undefined ? InformationList[selectedInformationIndex] : undefined;

    return (
        <Row justifyContent="space-between" paddingY={2}>
            {InformationList.map((information, index) => (
                <Column
                    onClick={() => setSelectedInformationIndex(index)}
                    gap={2}
                    className={css.information}
                    key={index}
                >
                    <Box height={58} width={58} className={css.box} borderRadius={4}>
                        <Image
                            className={css.image}
                            src={information.image}
                            width={58}
                            height={58}
                            alt="tridva store"
                        />
                    </Box>
                    <Box as={information.titleTag} width="100%" display="flex" justifyContent="center">
                        <Text block size={8} weight={600} align="center">
                            {information.title}
                        </Text>
                    </Box>
                </Column>
            ))}

            <Modal
                isOpen={selectedInformationIndex !== undefined}
                withLine={false}
                onClose={() => setSelectedInformationIndex(undefined)}
            >
                <PopUp title={selectedInformation?.title} description={selectedInformation?.description} />
            </Modal>
        </Row>
    );
}
