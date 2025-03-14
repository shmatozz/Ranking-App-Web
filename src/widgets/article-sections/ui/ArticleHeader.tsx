import React, {useEffect, useState} from "react";
import {Button, Modal} from "@/shared/ui";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {News, NewsCreateForm, useNewsCreateStore, useNewsStore} from "@/features/news";

interface ArticleHeaderProps {
  selectedNews: News;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  selectedNews,
}) => {
  const session = useSession();
  const router = useRouter();
  const { whoAmI, getWhoAmI } = useWhoAmIStore();
  const { deleteNews, isDeleting, updateNews } = useNewsStore();
  const { getFilledNews, formVisible, setFormVisible, fillForm, clearForm } = useNewsCreateStore()

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!whoAmI && session.data) getWhoAmI()
  }, [whoAmI, getWhoAmI, session.data]);

  const handleDelete = (id: number) => {
    deleteNews(id, () => {
      setIsModalOpen(false);

      if (window.history.length > 1) router.back();
      else router.replace("/");
    });
  };

  return (
    <div className={"flex flex-row items-center justify-between"}>
      <label className="text-h4 text-base-95">{selectedNews.topic}</label>

      <div className={"flex flex-row gap-2"}>
        {whoAmI && whoAmI.admin && (
          <>
            <Button
              variant={"tertiary"} size={"S"} palette={"blue"}
              onClick={() => {
                fillForm(selectedNews);
                setFormVisible(true)
              }}
            >
              Редактировать новость
            </Button>

            {formVisible && (
              <NewsCreateForm
                onSubmit={() => {
                  updateNews(selectedNews.id, getFilledNews());
                  clearForm()
                }}
                onCancel={() => setFormVisible(false)}
              />
            )}
          </>
        )}

        {whoAmI && whoAmI.admin && (
          <>
            <Button
              variant={"tertiary"} size={"S"} palette={"gray"}
              onClick={() => setIsModalOpen(true)}
            >
              Удалить новость
            </Button>

            {isModalOpen && (
              <Modal>
                <p>Вы уверены, что хотите удалить новость?</p>
                <div className="flex gap-4 mt-4 justify-evenly">
                  <Button variant="primary" size={"S"} onClick={() => handleDelete(selectedNews.id)}
                          isLoading={isDeleting}>Удалить</Button>
                  <Button variant="secondary" size={"S"} onClick={() => setIsModalOpen(false)}>Отмена</Button>
                </div>
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  )
}
